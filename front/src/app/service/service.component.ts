import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Employee, Client, PriceList , Car, Service} from '../app.component'


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
  selectedIndex:number = 0

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
 await this.http.get('http://localhost:3001/api/services?state=1').subscribe((response) => { this.query = response })

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



async showUpdateServiceForm(index:number){
  this.visibleAddNewService = false
  this.visibleUpdateService = true

  //Обнуление данных, если останутся значения в памяти
  // this.date_start_repairs = new Date
  // this.date_finish_repairs = new Date
  this.car_id = 0
  this.client_id = 0
  this.employee_id = 0
  this.price_list_id = '3, 2, 6, 16'

  // Загружаем данные в обьекты
  this.ngOnInit()

  this.selectedIndex = index
  
 
  // Перезаписываем данные для отображения в разметку
  this.date_start_repairs = this.query[index].start
  this.date_finish_repairs = this.query[index].finish
  this.price_list_id = this.query[index].price_list_id

}
updateService(){
  // Перезаписываем данные для отображения в разметку
  this.car_id = this.selectedCarModel
  this.client_id = this.selectedClientModel
  this.employee_id = this.selectedEmployeeModel
  this.price_list_id = JSON.stringify(this.selectedPriceListModel)


  this.query[this.selectedIndex].start = this.date_start_repairs
  this.query[this.selectedIndex].finish = this.date_finish_repairs
  this.query[this.selectedIndex].car_id = this.car_id
  this.query[this.selectedIndex].client_id = this.client_id
  this.query[this.selectedIndex].employee_id = this.employee_id
  this.query[this.selectedIndex].price_list_id = this.price_list_id
  this.query[this.selectedIndex].state = this.state


  
  let obj = {
    id:this.query[this.selectedIndex].id,
    date_start_repairs: this.query[this.selectedIndex].start,
    date_finish_repairs: this.query[this.selectedIndex].finish,
    car_id: this.car_id,
    client_id: this.client_id,
    employee_id:this.employee_id,
    state:this.query[this.selectedIndex].state,
    price_list_id: this.query[this.selectedIndex].price_list_id,
    update:true // true. Состояние изменения всех данных
  }

  //Формирование и отправка данных на сервер
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(`http://localhost:3001/api/services/?id=${obj.id}`, obj, {headers:myHeader})
  .subscribe(res => console.log(res))
  this.reloadPage()

}
removeService(index:number){
  let indexRemove = this.query[index].id

  let url = `http://localhost:3001/api/services/?id=${indexRemove}`
  // Отправляем запрос на удаление
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.delete(url, {headers:myHeader})
  .subscribe(()=> { console.log('Success');
  })
  // Обновляем страницу
  this.reloadPage()

}
// Закрытие заявки
finishRequest(index:number){
  // Получим индекс заявки которую необходимо завершить
   let indexFinish = this.query[index].id

  let url = `http://localhost:3001/api/services`
  
  let body = { "id":indexFinish, "state":2, "update": false }; // 1. Состояние изменения заявки

  // Отправляем запрос на изменение состояния заявки
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(url, body, {headers:myHeader})
  .subscribe(()=> { console.log('Success');
  })
  // Обновляем страницу
  this.reloadPage()
}


//#region State 
async showStateCurrent(){
// 149x37

  let context = <HTMLButtonElement>document.querySelector('#relevance')
  context.style.background = '#FFCD39'
  context.style.color = '#000'
  context.style.height = '37px'
  context.style.width = '149px'
  context.textContent = 'В работе'
  
  await this.http.get('http://localhost:3001/api/services?state=1').subscribe((response) => { this.query = response })
}
async showStateDone(){
  // Поменяем заголовок выбранного блока и настройка для понимая что было выбрано
  let context = <HTMLButtonElement>document.querySelector("#relevance")
  context.style.background = 'green'
  context.style.color = '#fff'
  context.style.height = '37px'
  context.style.width = '149px'
  context.textContent = 'Выполненные'

  await this.http.get('http://localhost:3001/api/services?state=2').subscribe((response) => { this.query = response })
  
}
async showStateArchive(){

  // Решить вопрос автоматической перезагрузки страницы, изза чего все атрибуты и классы обнуляются
 // await this.http.get('http://localhost:3001/api/services?state=3').subscribe((response) => { this.query = response })
  
  let context = <HTMLButtonElement>document.querySelector("#relevance")
  context.style.background = '#E35D6A'
  context.style.height = '37px'
  context.style.width = '149px'
  context.textContent = 'Архив'

 
  
  // let header = <HTMLTableHeaderCellElement>document.querySelector("#state_block_header")
  // let body = <HTMLTableDataCellElement>document.querySelector("#state_block_data")
  
  let header = <HTMLTableRowElement>document.querySelector("#state_block_header")?.lastChild
  let body = <HTMLTableRowElement>document.querySelector("#state_block_data")?.lastChild

  // header.style.display = "none"
  // body.style.display ="none"
  header.className = 'hiden_block'
  body.className = 'hiden_block'

 
}


//#endregion

//#region  Сортировки
async sortById(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${1}`).subscribe((response) => { this.query = response })
} 
async sortByMarkCar(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${2}`).subscribe((response) => { this.query = response })
}
async sortBySurnameClient(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${3}`).subscribe((response) => { this.query = response })
}
async sortBySurnameEmployee(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${4}`).subscribe((response) => { this.query = response })
}
async sortByStartRepairs(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${5}`).subscribe((response) => { this.query = response })
}

async sortByFinishRepairs(){
  await this.http.get(`http://localhost:3001/api/sortServices/?myKey=${6}`).subscribe((response) => { this.query = response })
}
//#endregion

cardToggle(event: MouseEvent){
  (event.target as HTMLElement).parentElement?.classList.toggle("card--open")
}
} // ServiceComponent

