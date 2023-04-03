import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dash', component: DashboardComponent},
  {path: 'cotizacion', component: CotizacionComponent},
  {path: 'pdf', component: PdfComponent},
  {path: '', redirectTo: 'login', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
