import { ContactTwoPageComponent } from './pages/contact-two-page/contact-two-page.component';
import { ContactOnePageComponent } from './pages/contact-one-page/contact-one-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
  { path: AppURl.AppInfoRoot, redirectTo: AppURl.AppContact, pathMatch: 'full' },
  { path: AppURl.AppContact, component: ContactPageComponent, children: [
    { path: AppURl.AppContactOne, component: ContactOnePageComponent},
    { path: AppURl.AppContactTwo, component: ContactTwoPageComponent},
  ]},
  { path: AppURl.AppAbout, component: AboutPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
