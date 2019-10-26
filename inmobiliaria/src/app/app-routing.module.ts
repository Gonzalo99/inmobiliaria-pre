import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { ContactarComponent } from '../components/contactar/contactar.component';
import { LegalComponent } from '../components/legal/legal.component';
import { InformationComponent } from '../components/information/information.component';
import { ErrorComponent } from '../components/error/error.component';
import { InmueblesComponent } from '../components/inmuebles/inmuebles.component';
import { InmuebleComponent } from '../components/inmueble/inmueble.component';
import { AdminComponent } from '../components/admin/admin.component';
import { DetailInmuebleAdminComponent } from '../components/detail-inmueble-admin/detail-inmueble-admin.component';
import { EditInmuebleComponent } from '../components/edit-inmueble/edit-inmueble.component';
import { HipotecaComponent } from 'src/components/hipoteca/hipoteca.component';

const routes: Routes = [
  {path: '', component: InmueblesComponent},
  {path: 'contactar', component: ContactarComponent},
  {path: 'legal', component: LegalComponent},
  {path: 'information', component: InformationComponent},
  {path: 'inmuebles', component: InmueblesComponent},
  {path: 'inmueble/:id', component: InmuebleComponent},
  {path: 'hipoteca', component: HipotecaComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'detail-inmueble-admin/:id', component: DetailInmuebleAdminComponent},
  {path: 'edit-inmueble/:id', component: EditInmuebleComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ContactarComponent, LegalComponent];


