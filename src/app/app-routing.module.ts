import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportDetailComponent } from './airport-detail/airport-detail.component';
import { AirportListComponent } from './airport-list/airport-list.component';

const routes: Routes = [
  { path: 'airport/:id', component: AirportDetailComponent },
  { path: '', component: AirportListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
