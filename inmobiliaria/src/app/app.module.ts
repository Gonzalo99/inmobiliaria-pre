import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AgmCoreModule } from '@agm/core';

//Components
import { AppComponent } from './app.component';
import { InformationComponent } from '../components/information/information.component';
import { ErrorComponent } from '../components/error/error.component';
import { InmueblesComponent } from '../components/inmuebles/inmuebles.component';
import { InmuebleComponent } from '../components/inmueble/inmueble.component';
import { AdminComponent } from '../components/admin/admin.component';
import { DetailInmuebleAdminComponent } from '../components/detail-inmueble-admin/detail-inmueble-admin.component';
import { EditInmuebleComponent } from '../components/edit-inmueble/edit-inmueble.component';

//Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAdminPipe } from './pipes/filter-admin.pipe';
import { HipotecaComponent } from 'src/components/hipoteca/hipoteca.component';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    InformationComponent,
    ErrorComponent,
    InmueblesComponent,
    FilterPipe,
    InmuebleComponent,
    AdminComponent,
    DetailInmuebleAdminComponent,
    FilterAdminPipe,
    EditInmuebleComponent,
    HipotecaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkVAP5SfABZMgMY1iazZtlUkUhAPkkVTA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
