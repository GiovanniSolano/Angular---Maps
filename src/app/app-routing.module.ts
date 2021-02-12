import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaLibreriaComponent } from './components/mapa-libreria/mapa-libreria.component';
import { MapaNativoComponent } from './components/mapa-nativo/mapa-nativo.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [

  { path: 'nativo', component: MapaNativoComponent},
  { path: 'libreria', component: MapaLibreriaComponent},
  { path: 'inicio', component: InicioComponent},
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: '**', redirectTo: 'inicio'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
