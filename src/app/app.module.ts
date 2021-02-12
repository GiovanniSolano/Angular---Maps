import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaNativoComponent } from './components/mapa-nativo/mapa-nativo.component';
import { MapaLibreriaComponent } from './components/mapa-libreria/mapa-libreria.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from "@angular/common/http";
import { InicioComponent } from './components/inicio/inicio.component';
@NgModule({
  declarations: [
    AppComponent,
    MapaNativoComponent,
    MapaLibreriaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
