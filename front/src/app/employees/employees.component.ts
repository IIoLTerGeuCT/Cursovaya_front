import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Employee, Person} from '../app.component'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

 
  query:any
  urlConnect:string = 'http://localhost:3001/api/employees'

  visibleAddNewEmployee:boolean = false
  visibleUpdateEmployee:boolean = false
  
  selectedIndex:number = 0
 
  expirience:number = 0
  rank:number = 0
  specialization: string = ''
  person_id:number = 0
  state:number = 1
  
   // Коллекция персон для select options
   persons:Person[] = []
   selectedPersonForEmploee:any // Id Model Person  выбранного в select
  

  constructor(private http: HttpClient){}

async ngOnInit(){
  await this.http.get('http://localhost:3001/api/employees').subscribe((response) => { this.query = response })
}

reloadPage(){
  location.reload()
  this.ngOnInit()
}

async showAddNewEmployeeForm(){
  this.visibleAddNewEmployee = true
  this.visibleUpdateEmployee = false

  // Забираем всех персон из таблицы, для прогрузки в Select
  await this.http.get('http://localhost:3001/api/persons').subscribe((res) => {  this.persons = <Array<Person>>res  })
}
async addNewEmployee(){
  this.visibleAddNewEmployee = true
  this.visibleUpdateEmployee = false

  // Получим выбранного персоны id
  this.person_id =  (this.persons.filter(item => item.id === Number.parseInt(this.selectedPersonForEmploee)))[0].id
  // Формируем нового сотрудника
  let newEmployee = new Employee(this.expirience,this.person_id, this.rank,  this.specialization, this.state)
  
  // Проверяем на наличие все данных, и отправляем запрос
  if(this.expirience !== null || this.rank !== null || this.expirience !== '' || this.person_id !==null ){
    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    await this.http.put(this.urlConnect, newEmployee, {headers:myHeader})
      .subscribe(res => console.log(res))    
     this.reloadPage()
  }


}

async showUpdateEmployeeForm(index:number){
  this.visibleAddNewEmployee = false
  this.visibleUpdateEmployee = true

  // Обнуление данных
  this.expirience = 0
  this.rank = 0
  this.state = 1
  this.person_id = 0
  this.specialization = ''

  // Забираем всех персон из таблицы, для прогрузки в Select
  await this.http.get('http://localhost:3001/api/persons').subscribe((res) => {  this.persons = <Array<Person>>res  })

  // Получаем индекс выбранного элемента
  this.selectedIndex = index
  // Перезаписываем данные для отображения в разметку 
  
  this.expirience = this.query[index].expirience
  this.rank = this.query[index].rank
  this.state = this.query[index].state
  this.person_id = this.query[index].person_id
  this.specialization = this.query[index].specialization

}

updateEmployee(){

  // Получим выбранного персоны id
  this.person_id =  (this.persons.filter(item => item.id === Number.parseInt(this.selectedPersonForEmploee)))[0].id

 // Переписываем данные из разметки в основную коллекцию
 this.query[this.selectedIndex].expirience = this.expirience
 this.query[this.selectedIndex].rank = this.rank
 this.query[this.selectedIndex].state = this.state
 this.query[this.selectedIndex].person_id = this.person_id
 this.query[this.selectedIndex].specialization = this.specialization


  // Формирование и отправка данных на сервер
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(this.urlConnect, this.query[this.selectedIndex], {headers:myHeader})
  .subscribe(res => console.log(res))
  this.reloadPage()
}


removeEmployee(index:number){
   // Получаем id обьекта для удаления
   let indexRemove = this.query[index].id

   console.log(indexRemove);
   
  //  // Передаем в качестве параметра id 
  let url = `http://localhost:3001/api/employees/?id=${indexRemove}`
 
   // Отправляем запрос на удаление
   const myHeader = new HttpHeaders().set('Content-Type','application/json')
   this.http.delete(url, {headers:myHeader})
   .subscribe(()=> { console.log('Success');
   })
   // Обновляем страницу
  this.reloadPage()


}

}
