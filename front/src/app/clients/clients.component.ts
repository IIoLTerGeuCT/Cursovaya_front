import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Client, Person} from '../app.component'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  query:any
  urlConnect:string = 'http://localhost:3001/api/clients'

  visibleAddNewClient:boolean = false
  visibleUpdateClient:boolean = false
  selectedIndex:number = 0


  date_born:Date = new Date
  habitation:string = ''
  pass_id:string = ''
  person_id: number = 0
  state:number = 1

  
  //persons: any  // Коллекция персон для select options
  persons:Person[] = []
  selectedPerson:any // Id Person  выбранного в select

  constructor(private http: HttpClient){}

async ngOnInit(){
  await this.http.get(this.urlConnect).subscribe((response) => { this.query = response })
}
reloadPage(){
  location.reload()
  this.ngOnInit()
}


async showAddNewClientForm(){
    this.visibleAddNewClient = true
    this.visibleUpdateClient = false

  // Забираем всех персон из таблицы, для прогрузки в Select
  await this.http.get('http://localhost:3001/api/persons').subscribe((res) => {  this.persons = <Array<Person>>res  })
 
}

 async addNewClient(){
    this.visibleAddNewClient = true
    this.visibleUpdateClient = false
   
   // Получим выбранного персоны id
  this.person_id =  (this.persons.filter(item => item.id === Number.parseInt(this.selectedPerson)))[0].id

  // Формируем нового клиента
  let newClient = new Client(this.date_born, this.habitation,this.pass_id, this.person_id, this.state) 

  // Проверяем на наличие все данных, и отправляем запрос
  if( newClient.date_born !== null || newClient.habitation !== '' 
      || newClient.pass_id !== '' || newClient.person_id !== null){
      const myHeader = new HttpHeaders().set('Content-Type','application/json')
    await this.http.put(this.urlConnect, newClient, {headers:myHeader})
      .subscribe(res => console.log(res))    
     this.reloadPage()
  } // if
  
} // addNewClient

async showUpdateClientForm(index:number){
  this.visibleAddNewClient = false
  this.visibleUpdateClient = true

  //Обнуление данных
  this.date_born = new Date
  this.habitation = ''
  this.pass_id = ''
  this.person_id = 0
  this.state = 1

  // Забираем всех персон из таблицы, для прогрузки в Select
  await this.http.get('http://localhost:3001/api/persons').subscribe((res) => {  this.persons = <Array<Person>>res  })

  // Получаем индекс выбранного элемента
  this.selectedIndex = index

  // Перезаписываем данные для отображения в разметку
  this.date_born = this.query[index].date_born
  this.habitation = this.query[index].habitation
  this.pass_id = this.query[index].pass_id
  this.person_id = this.query[index].person_id
  this.state = this.query[index].state
}
updateClient(){
  // Получим выбранного персоны id
  this.person_id =  (this.persons.filter(item => item.id === Number.parseInt(this.selectedPerson)))[0].id

  // Переписываем данные из разметки в основную коллекцию
  this.query[this.selectedIndex].date_born = this.date_born
  this.query[this.selectedIndex].habitation = this.habitation
  this.query[this.selectedIndex].pass_id = this.pass_id
  this.query[this.selectedIndex].person_id = this.person_id
  this.query[this.selectedIndex].state = this.state


  
  // Формирование и отправка данных на сервер
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(this.urlConnect, this.query[this.selectedIndex], {headers:myHeader})
  .subscribe(res => console.log(res))
  this.reloadPage()

}

removeClient(index:number){
  // Получаем id обьекта для удаления
  let indexRemove = this.query[index].id
  // Передаем в качестве параметра id 
  let url = `http://localhost:3001/api/clients/?id=${indexRemove}`

  // Отправляем запрос на удаление
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.delete(url, {headers:myHeader})
  .subscribe(()=> { console.log('Success');
  })
  // Обновляем страницу
  this.reloadPage()
}






}// Component