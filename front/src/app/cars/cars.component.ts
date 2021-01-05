import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Car, Owner } from '../app.component'


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  query:any // Контейнер для хранения данных запроса
  urlConnect:string = 'http://localhost:3001/api/cars' // маршрут 

  // Состояния видимости форм ввода и редактирования
  visibleAddNewCar:boolean = false
  visibleUpdateCar:boolean = false
  selectedIndex:number = 0
 
  color:string = ''
  mark:string = ''
  gos_number:string = ''
  year_production:number = 0
  owner_id: Owner = new Owner('') 
  state:number = 1


  constructor(private http: HttpClient){}

async ngOnInit(){
  await this.http.get(this.urlConnect).subscribe((response) => { this.query = response })
}
reloadPage(){
  location.reload()
  this.ngOnInit()
}
addNewCar(){
  this.visibleAddNewCar = true
  this.visibleUpdateCar = false

  let car = new Car(this.color, this.mark, 
                    this.gos_number, this.year_production, 
                    this.owner_id, this.state )
    if(car.color !== '' || car.mark !== '' || car.gos_number !== '' || 
       car.year_production !== 0 || car.owner_id.type !== ''){
        const myHeader = new HttpHeaders().set('Content-Type','application/json')
    
        this.http.put(this.urlConnect, car, {headers:myHeader})
          .subscribe(res => console.log(res))    
        this.reloadPage()
    }
}
showUpdateCar(index:number){
  this.visibleAddNewCar = false
  this.visibleUpdateCar = true

  //Обнуление данных
  this.color = ''
  this.mark = ''
  this.gos_number = ''
  this.year_production = 0
  this.owner_id = new Owner('') 
  this.state = 1

  this.selectedIndex = index

  this.color = this.query[index].color
  this.mark = this.query[index].mark
  this.gos_number = this.query[index].gos_number
  this.year_production = this.query[index].year_production
  this.owner_id = this.query[index].owner_id
  this.state = this.query[index].state
}
updateCar(){
  this.query[this.selectedIndex].color = this.color
  this.query[this.selectedIndex].mark = this.mark
  this.query[this.selectedIndex].gos_number = this.gos_number
  this.query[this.selectedIndex].year_production = this.year_production
  this.query[this.selectedIndex].owner_id = this.owner_id
  this.query[this.selectedIndex].state = this.state


  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(this.urlConnect, this.query[this.selectedIndex], {headers:myHeader})
  .subscribe(res => console.log(res))
  this.reloadPage()
}

removeCar(index:number){
  let indexRemove = this.query[index].id
    let url = `http://localhost:3001/api/cars/?id=${indexRemove}`

    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    this.http.delete(url, {headers:myHeader})
    .subscribe(()=> { console.log('Success');
    })
    this.reloadPage()
}


}
