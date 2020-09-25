import { AppCollections } from './../../../../config/app-collections.config';
import { Component, OnInit, Directive } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Shops } from 'src/app/core/models/shops';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { AppURl } from 'src/app/config/app-urls.config';
import { Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any

@Component({
  selector: 'app-shop-detail-page',
  templateUrl: './shop-detail-page.component.html',
  styleUrls: ['./shop-detail-page.component.scss'],
})

export class ShopDetailPageComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Shops>;
  item: Shops;
  identificator: string;
  newShopFrom = new FormGroup({
    shopName: new FormControl(''),
    openHour: new FormControl(''),
    closeHour: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    comentarie: new FormControl('')
  })

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.itemDoc = this.firestore.doc<Shops>(AppCollections.quarenteneCollection + '/' + this.route.snapshot.paramMap.get('id'));
    this.identificator = this.route.snapshot.paramMap.get('id');
    console.log(this.identificator);
    this.itemDoc.valueChanges().subscribe(data => {
      this.item = data;
      if (this.item != undefined) {
        this.item["id"] = this.identificator;
      }
    });
  }

  update(item: Shops) {
    this.itemDoc.update(item);
  }

  Modify(id, name, longitude, latitude, openHour, closeHour, comentarie) {
    document.getElementById("buscador").style.visibility = "visible";
    this.newShopFrom = new FormGroup({
      shopName: new FormControl(name),
      openHour: new FormControl(openHour),
      closeHour: new FormControl(closeHour),
      latitude: new FormControl(latitude),
      longitude: new FormControl(longitude),
      comentarie: new FormControl(comentarie),
      id: new FormControl(id),
    })
  }

  goToList() {
    this.router.navigate([AppURl.AppFormBackgroundShops, 'back-shops', 'shops-list']);
  }

  delete(id) {
    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
    if (email === "asuarezc91@gmail.com") {
      this.firestore.collection("quarenteneStore").doc(id).delete().then(function () { console.log("good") }).catch(function (error) { console.log("error", error) });
    } else {
      alert("You can't delete this item");
    }
  }

  onSubmit() {
    let FromShops = this.newShopFrom;
    const FromValues = FromShops.value;
    const id = FromValues.id;
    let washingtonRef = this.firestore.collection("quarenteneStore").doc(id);
    return washingtonRef.update({
      closeHour: FromValues.closeHour,
      latitude: FromValues.latitude,
      longitude: FromValues.longitude,
      name: FromValues.shopName,
      openHour: FromValues.openHour,
      comentarie: FromValues.comentarie
    })
      .then(function () {
        FromShops = new FormGroup({
          shopName: new FormControl(''),
          openHour: new FormControl(''),
          closeHour: new FormControl(''),
          latitude: new FormControl(''),
          longitude: new FormControl(''),
          comentarie: new FormControl('')
        })
        document.getElementById("buscador").style.visibility = "hidden";
        swal("Good job!", "The store was updated!", "success");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }

  delComm(id: string) {
    let washingtonRef = this.firestore.collection("quarenteneStore").doc(id);
    return washingtonRef.update({
      comentarie: ""
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }
}