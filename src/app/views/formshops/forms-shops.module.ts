import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsShopsRoutingModule } from './forms-shops-routing.module';
import { FormsShopsPageComponent } from './pages/forms-shops-page/forms-shops-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopsListPageComponent } from './pages/shops-list-page/shops-list-page.component';
import { BackgroundPageComponent } from './pages/background-page/background-page.component';
import { ShopDetailPageComponent } from './pages/shop-detail-page/shop-detail-page.component';
import { EsriMapComponent } from './pages/esri-map/esri-map.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [BackgroundPageComponent,FormsShopsPageComponent, ShopsListPageComponent,ShopDetailPageComponent,EsriMapComponent],
  imports: [
    CommonModule,
    FormsShopsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    MatSliderModule,
    MatIconModule
  ]
})

export class FormsShopsModule { }


