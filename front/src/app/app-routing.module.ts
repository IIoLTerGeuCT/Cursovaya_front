import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { PersonsComponent } from './persons/persons.component';
import { PriceListComponent} from './price-list/price-list.component'
import {EmployeesComponent} from './employees/employees.component'
import {ClientsComponent} from './clients/clients.component'
import {CarsComponent} from './cars/cars.component'
import {ServiceComponent} from './service/service.component'


const routes: Routes = [  { path: 'persons', component: PersonsComponent },
                          { path: 'employees', component: EmployeesComponent},
                          { path: 'price-list', component: PriceListComponent},
                          { path: 'clients', component: ClientsComponent},
                          { path: 'cars', component: CarsComponent},
                          { path: 'service', component: ServiceComponent},

                        
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
