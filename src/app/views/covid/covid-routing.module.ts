import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { EsriMapComponent } from './pages/esri-map/esri-map.component';

const routes: Routes = [{ path: AppURl.AppCovidRoot, redirectTo: AppURl.AppCovid, pathMatch: 'full' },
{ path: AppURl.AppCovid, component: EsriMapComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule { }
