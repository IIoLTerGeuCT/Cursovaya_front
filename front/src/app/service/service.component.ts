import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Employee, Person, Client, PriceList , Car, Service} from '../app.component'


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  query:any // Общие данные возвращаемые из базы
  urlConnect:string = 'http://localhost:3001/api/services' // Строка подключения

  // Состояния видимости блоков добавления/изменения данных
  visibleAddNewService:boolean = false
  visibleUpdateService:boolean = false

  // Индекса выбранных элементов
  selectedIndexCar:number = 0
  selectedIndexClient:number = 0
  selectedIndexEmployee:number = 0

  // Свойства для создания сущности
  date_start_repairs:Date = new Date
  date_finish_repairs:Date = new Date
  car_id:number = 0
  client_id:number = 0
  employee_id:number = 0
  state:number = 1
  price_list_id: string = '3, 2, 6, 16'


  // Коллекции для вывода в select
  cars:Car[] = []
  clients:any
  employees:any
  price_lists:any

  // Модели  выбранные в select
  selectedCarModel:any
  selectedClientModel:any
  selectedEmployeeModel:any
  selectedPriceListModel:any


  constructor(private http: HttpClient){}

async ngOnInit(){
 await this.http.get('http://localhost:3001/api/services').subscribe((response) => { this.query = response })

 // Забираем все авто из таблицы, для прогрузки в Select
 await this.http.get('http://localhost:3001/api/cars').subscribe((res) => {  this.cars = <Array<Car>>res  })

 // Забираем всех клиентов из таблицы, для прогрузки в Select
 await this.http.get('http://localhost:3001/api/clients').subscribe((res) => {  this.clients = res  })

 // Забираем всех сотрудников из таблицы, для прогрузки в Select
 await this.http.get('http://localhost:3001/api/employees').subscribe((res) => {  this.employees = res })

 // Забираем все прайс_лист данные 
 await this.http.get('http://localhost:3001/api/priceLists').subscribe((res) => { this.price_lists = res })
}

reloadPage(){
  location.reload()
  this.ngOnInit()
}
showAddNewServiceForm(){
  this.visibleAddNewService = true
  this.visibleUpdateService = false

}
async addNewService(){
  this.visibleAddNewService = true
  this.visibleUpdateService = false

  // Получаем id всех выбранных обьектов
  this.car_id = this.selectedCarModel
  this.client_id = this.selectedClientModel
  this.employee_id = this.selectedEmployeeModel
  this.price_list_id = JSON.stringify(this.selectedPriceListModel)

  // Формируем новый обьект
  let service = new Service(this.car_id, this.client_id, 
                            this.employee_id,this.date_finish_repairs, 
                            this.date_start_repairs, this.price_list_id, this.state )


  if(this.car_id !== null || this.client_id !== null || this.employee_id !== null || this.price_list_id !==null ){
    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    await this.http.put(this.urlConnect, service, {headers:myHeader})
      .subscribe(res => console.log(res))    
      this.reloadPage()
  }
  this.visibleAddNewService = false
  this.visibleUpdateService = false

}

showPriceListInServiceTable(indexService:number){
  // Создали обьект
  let curentPlforItemServer:PriceList[] = []
  // Получаем массив с id priceList 
  let priceList:number [] = JSON.parse(this.query[indexService].price_list_id)
  
// Записываем данные в обьект
  if(priceList && this.price_lists ){
    for (let i = 0; i < (<Array<PriceList>>this.price_lists).length; i++) {
      for (let j = 0; j < priceList.length; j++) {
        if((<Array<PriceList>>this.price_lists)[i].id === priceList[j]){
          curentPlforItemServer.push((<Array<PriceList>>this.price_lists)[i])
        }
      }
    }
  }

// Выводим на страницу
 return curentPlforItemServer;
}
restoreAddData(){
  this.visibleAddNewService = false
  this.visibleUpdateService = false
}



showUpdateServiceForm(index:number){}
// updateService(){}
removeService(index:number){}

//#region  Сортировки
async sortByMarkCar(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${1}`).subscribe((response) => { this.query = response })
}
async sortBySurnameClient(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${2}`).subscribe((response) => { this.query = response })
}
async sortBySurnameEmployee(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${3}`).subscribe((response) => { this.query = response })
}
async sortByStartRepairs(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${4}`).subscribe((response) => { this.query = response })
}

async sortByFinishRepairs(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${5}`).subscribe((response) => { this.query = response })
}
//#endregion

cardToggle(event: MouseEvent){

  (event.target as HTMLElement).parentElement?.classList.toggle("card--open")
  
}
}

