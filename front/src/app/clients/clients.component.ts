import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Client} from '../app.component'

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

  surname:string = ''
  name:string = ''
  patronamic:string = ''
  date_born:Date = new Date
  habitation:string = ''
  pass_id:string = ''
  state:number = 1

    constructor(private http: HttpClient){}

async ngOnInit(){
  await this.http.get(this.urlConnect).subscribe((response) => { this.query = response })
}
reloadPage(){
  location.reload()
  this.ngOnInit()
}


showAddNewClientForm(){
    this.visibleAddNewClient = true
    this.visibleUpdateClient = false

}

 async addNewClient(){
   
  // Формируем нового клиента
  let newClient = new Client(this.date_born, this.habitation,this.pass_id, this.surname, this.name,this. patronamic , this.state) 

  // Проверяем на наличие все данных, и отправляем запрос
  if( newClient.date_born !== null || newClient.habitation !== '' 
      || newClient.pass_id !== '' || newClient.surname !== null || newClient.name !== null || newClient.patronamic !== null){
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
  this.surname = ''
  this.name = ''
  this.patronamic = ''
  this.state = 1

  
  // Получаем индекс выбранного элемента
  this.selectedIndex = index

  // Перезаписываем данные для отображения в разметку
  this.date_born = this.query[index].date_born
  this.habitation = this.query[index].habitation
  this.pass_id = this.query[index].pass_id
  this.surname = this.query[index].surname
  this.name = this.query[index].name
  this.patronamic = this.query[index].patronamic
  this.state = this.query[index].state
}
updateClient(){
 
  // Переписываем данные из разметки в основную коллекцию
  this.query[this.selectedIndex].date_born = this.date_born
  this.query[this.selectedIndex].habitation = this.habitation
  this.query[this.selectedIndex].pass_id = this.pass_id
  this.query[this.selectedIndex].surname = this.surname
  this.query[this.selectedIndex].name = this.name
  this.query[this.selectedIndex].patronamic = this.patronamic
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