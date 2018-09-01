import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ObesidadComponent} from './components/obesidad/obesidad.component';
import {NutricionComponent} from './components/nutricion/nutricion.component';
import {DietaComponent} from './components/dieta/dieta.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'obesidad', component: ObesidadComponent },
  { path: 'nutricion', component: NutricionComponent },
  { path: 'dieta', component: DietaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
