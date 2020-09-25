import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppURl } from '../config/app-urls.config';

const routes: Routes = [
  { path: AppURl.AppRoot, redirectTo: AppURl.AppHome, pathMatch: 'full' },
  { path: AppURl.AppAuth, loadChildren: () => import('../views/auth/auth.module').then(m => m.AuthModule) },
  { path: AppURl.AppHome, loadChildren: () => import('../views/home/home.module').then(m => m.HomePageModule) },
  { path: AppURl.AppInfo, loadChildren: () => import('../views/info/info.module').then(m => m.InfoModule) },
  { path: AppURl.AppFormBackgroundShops, loadChildren: () => import('../views/formshops/forms-shops.module').then(m => m.FormsShopsModule) },
  { path: AppURl.AppCovid, loadChildren: () => import('../views/covid/covid.module').then(m => m.CovidModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
