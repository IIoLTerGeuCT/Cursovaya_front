import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Employee} from '../app.component'

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
 
  surname:string = ''
  name:string = ''
  patronamic:string = ''
  expirience:number = 0
  rank:number = 0
  specialization: string = ''
  person_id:number = 0
  state:number = 1
  

  

  constructor(private http: HttpClient){}

async ngOnInit(){
  await this.http.get('http://localhost:3001/api/employees').subscribe((response) => { this.query = response })
}

reloadPage(){
  location.reload()
  this.ngOnInit()
}

showAddNewEmployeeForm(){
  this.visibleAddNewEmployee = true
  this.visibleUpdateEmployee = false


}
async addNewEmployee(){
  this.visibleAddNewEmployee = true
  this.visibleUpdateEmployee = false


  // Формируем нового сотрудника
  let newEmployee = new Employee(this.surname, this.name, this.patronamic,this.expirience,this.person_id, this.rank,  this.specialization, this.state)
  
  // Проверяем на наличие все данных, и отправляем запрос
  if(this.expirience !== null || this.rank !== null || this.expirience !== '' || this.person_id !==null ){
    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    await this.http.put(this.urlConnect, newEmployee, {headers:myHeader})
      .subscribe(res => console.log(res))    
     this.reloadPage()
  }


}

showUpdateEmployeeForm(index:number){
  this.visibleAddNewEmployee = false
  this.visibleUpdateEmployee = true

  // Обнуление данных
  this.surname = ''
  this.name = ''
  this.patronamic = ''
  this.expirience = 0
  this.rank = 0
  this.state = 1
  this.specialization = ''


  // Получаем индекс выбранного элемента
  this.selectedIndex = index
  // Перезаписываем данные для отображения в разметку 
  
  this.expirience = this.query[index].expirience
  this.rank = this.query[index].rank
  this.state = this.query[index].state
  this.surname = this.query[index].surname
  this.name = this.query[index].name
  this.patronamic = this.query[index].patronamic
  this.specialization = this.query[index].specialization

}

updateEmployee(){



 // Переписываем данные из разметки в основную коллекцию
 this.query[this.selectedIndex].expirience = this.expirience
 this.query[this.selectedIndex].rank = this.rank
 this.query[this.selectedIndex].state = this.state
 this.query[this.selectedIndex].surname = this.surname
 this.query[this.selectedIndex].name = this.name
 this.query[this.selectedIndex].patronamic = this.patronamic
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
