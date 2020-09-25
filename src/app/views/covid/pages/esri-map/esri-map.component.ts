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
import esri = __esri; // Esri TypeScript Types
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

  private _zoom = 3;
  private _center: Array<number> = [-3.67, 40.45];
  private _basemap = "dark-gray";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _featureL: esri.FeatureLayer = null;
  private _shops: any;
  updated : string; 


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
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer, geometryEngine, PopupTemplate] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polyline",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/Renderer",
        "esri/geometry/geometryEngine",
        "esri/PopupTemplate"

      ]);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);

      this.superheroService.getCovidData().subscribe(data => {
        console.log(data); 
        let confirmed = data.confirmed;
        let locations = confirmed.locations;
        let last_updated = confirmed.last_updated;
        this.updated = last_updated; 
        let cont = 0;
        let dataCOD = [];
        for (let i = 0; i < locations.length; i++) {
          cont++;
          const element = locations[i];
          let nameCountry = element.country;
          let latestCountry = element.latest;
          let coordinates = element.coordinates;
          let lat = coordinates.lat;
          let long = coordinates.long;
          let latNumber = Number(lat);
          let longNumber = Number(long);

          let points = {
            geometry: new Point({
              x: longNumber,
              y: latNumber
            }),
            attributes: {
              ObjectID: cont,
              name: nameCountry,
              latest: latestCountry
            }
          };
          dataCOD.push(points);
        }

        let template = {
          title: "{name}",
          content: [{
            type: "fields",
            fieldInfos: [
            {
              fieldName: "latest",
              label: "Confirmed"
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
            name: "latest",
            alias: "Latest",
            type: "double"
          }
          ],
          objectIdField: "ObjectID",
          geometryType: "point",
          spatialReference: { wkid: 4326 },
          source: dataCOD,
          renderer: {
            type: 'simple',
            label: "",
            description: "",
            symbol: {
              type: "picture-marker",
              url: 'https://static.arcgis.com/images/Symbols/Firefly/FireflyC1.png',
              width: '24px',
              height: '24px'
            },
          },
          popupTemplate: template
        });

        map.layers.add(this._featureL);

      }, err => {
        console.log('Error getCovidData: ' + err);
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
