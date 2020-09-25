import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovidRoutingModule } from './covid-routing.module';
import { EsriMapComponent } from './pages/esri-map/esri-map.component';
 

@NgModule({
  declarations: [EsriMapComponent],
  imports: [
    CommonModule,
    CovidRoutingModule
  ]
})
export class CovidModule { }
