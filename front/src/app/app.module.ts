import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }   from '@angular/common/http';
import { FormsModule} from '@angular/forms';


import { PersonsComponent } from './persons/persons.component';
import { PriceListComponent } from './price-list/price-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsComponent } from './clients/clients.component';
import { CarsComponent } from './cars/cars.component';
import { ServiceComponent } from './service/service.component';
import { SortServiceComponent } from './sort-service/sort-service.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PriceListComponent,
    EmployeesComponent,
    ClientsComponent,
    CarsComponent,
    ServiceComponent,
    SortServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
