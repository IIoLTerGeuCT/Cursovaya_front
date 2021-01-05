import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
 
  
}
export class Person{
  id:number = 0
  surname: string = ''
  name: string = ''
  patronamic: string = ''

  constructor(surname:string, name:string, patronamic:string){
    this.surname = surname,
    this.name = name,
    this.patronamic = patronamic
  }
}
export class PriceList{
  id: number = 0
  type:string = ''
  price:number = 0
  constructor(type:string, price:number){
    this.type = type,
    this.price = price
  }
}

export class Car {
  id:number = 0
  color:string = ''
  mark:string = ''
  gos_number:string = ''
  year_production:number = 0
  owner_id: Owner 
  state:number = 1
  constructor(color:string, mark:string, gos_number:string, 
    year_production:number, owner_id:Owner, state:number){
      this.color = color,
      this.mark = mark,
      this.gos_number = gos_number,
      this.owner_id = owner_id,
      this.state = state,
      this.year_production = year_production
    }
}

export class Owner{
  type:string = ''
  constructor(type:string){
    this.type = type
  }

}

export class Client{
    id:number = 0
    date_born:Date
    habitation:string = ''
    pass_id:string = ''
    person_id:number
    state:number = 1
    constructor(date_born:Date, habitation:string, pass_id:string,person_id:number,state:number){
      this.date_born = date_born,
      this.habitation = habitation,
      this.pass_id = pass_id,
      this.person_id = person_id,
      this.state = state
    }
} // client
export class Employee{
  id:number = 0
  expirience:number = 0
  person_id:number = 0
  rank:number = 0
  specialization:string = ''
  state:number = 1
  constructor(expirience:number,person_id:number, rank:number,specialization:string,state:number){
    this.expirience = expirience,
    this.person_id = person_id,
    this.rank = rank,
    this.specialization = specialization,
    this.state = state
 }
} // employee

export class Service{
  id:number = 0
  car_id:number
  client_id:number
  employee_id:number
  date_finish_repairs:Date
  date_start_repairs:Date
  price_list_id:string
  state:number = 0
  constructor(car_id:number, client_id:number, employee_id:number, 
              date_finish_repairs:Date, date_start_repairs:Date,
              price_list_id:string, state:number){
                this.car_id = car_id,
                this.client_id = client_id,
                this.employee_id = employee_id,
                this.date_finish_repairs = date_finish_repairs,
                this.date_start_repairs = date_start_repairs,
                this.price_list_id = price_list_id,
                this.state = state
              }


} // service

