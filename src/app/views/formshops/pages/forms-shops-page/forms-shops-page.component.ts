import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';


@Component({
  selector: 'app-forms-shops-page',
  templateUrl: './forms-shops-page.component.html',
  styleUrls: ['./forms-shops-page.component.scss'],
})
export class FormsShopsPageComponent implements OnInit {

  newShopFrom = new FormGroup({
    shopName: new FormControl(''),
    openHour: new FormControl(''),
    closeHour: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    comentarie : new FormControl('')
  })

  constructor(private afs: AngularFirestore) { }

  ngOnInit() { }

  onSubmit() {
    this.afs.collection('quarenteneStore').add(
      {
        name: this.newShopFrom.value.shopName,
        openHour: this.newShopFrom.value.openHour,
        closeHour: this.newShopFrom.value.closeHour,
        latitude: this.newShopFrom.value.latitude,
        longitude: this.newShopFrom.value.longitude,
        comentarie: this.newShopFrom.value.comentarie
      }
    ).then(res => { swal("Good job!", "The store was added!", "success"); }, err => console.log(err));
  }
}




