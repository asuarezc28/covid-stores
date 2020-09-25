import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri =__esri;

import { SelectItem } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Shops } from 'src/app/core/models/shops';
import { SuperheroService } from 'src/app/core/services/superhero.service';


@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  private _zoom = 11;
  private _center: Array<number> = [-17.93, 28.66];
  private _basemap = "dark-gray";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _featureL: esri.FeatureLayer = null;
  private _shops: any;


  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  shops: Shops[];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private superheroService: SuperheroService,
  ) { }


  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer,geometryEngine] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polyline",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/Renderer",
        "esri/geometry/geometryEngine"

      ]);


      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);

  
      this.firestore.collection('quarenteneStore').snapshotChanges().subscribe(data => {
        this._shops = data.map(elem =>
          new Shops(elem.payload.doc.data()['closeHour'], elem.payload.doc.data()['latitude'], elem.payload.doc.data()['longitude'], elem.payload.doc.data()['name'], elem.payload.doc.data()['openHour'], elem.payload.doc.id, elem.payload.doc.data()['comentarie']));
        let cont = 0;
        let dataArray = [];
        for (let i = 0; i < this._shops.length; i++) {
          cont++;
          const element = this._shops[i];
          console.log(element); 
          const latitude = element.latitude;
          const longitude = element.longitude;
          const name = element.name;
          const openHour = element.openHour;
          const closeHour = element.closeHour;
          let points = {
            geometry: new Point({
              x: longitude,
              y: latitude
            }),
            attributes: {
              ObjectID: cont,
              name: name,
              latitude: latitude,
              longitude : longitude,
              openhour : openHour,
              closehour : closeHour
            }
          };
          dataArray.push(points);
        }
 
        let template = {
          title: "{name}",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "latitude",
              label: "Latitude"
            },
            {
              fieldName: "longitude",
              label: "Longitude"
            }, {
              fieldName: "openhour",
              label: "Open Hour"
           },
           {
            fieldName: "closehour",
            label: "Close Hour"
         }]
          }]
  
        };
        

        this._featureL = new FeatureLayer({
          fields: [{
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
          }, {
            name: "name",
            alias: "Name",
            type: "string"
          },
          {
            name: "latitude",
            alias: "Latitude",
            type: "double"
          },
          {
            name: "longitude",
            alias: "Longitude",
            type: "double"
          },
          {
            name: "openhour",
            alias: "Open Hour",
            type: "string"
          },
          {
            name: "closehour",
            alias: "Close Hour",
            type: "string"
          }
          ],
          objectIdField: "ObjectID",
          geometryType: "point",
          spatialReference: { wkid: 4326 },
          source: dataArray,
          renderer: {
            type: "simple",
            label: "",
            description: "",
            symbol: {
              type: "picture-marker",
              url: 'data:image/png;base64,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',
              width: '50px',
              height: '50px'
            }
          },
          popupTemplate: template
        });

        map.layers.add(this._featureL);
      }, err => {
        console.log(err);
      });

      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };
      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;

    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap().then(mapView => {
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      this._view.container = null;
    }
  }
}
