import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Person } from '../app.component'

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit{

  query:any // Контейнер для хранения данных запроса
  urlConnect:string = 'http://localhost:3001/api/persons' // маршрут 

  // Состояния видимости форм ввода и редактирования
  visibleAddNewPerson: boolean = false
  visibleUpdatePerson: boolean = false
  selectedIndex:number = 0
  
  // Свойства для удобства работы с данными
  surname:string = ''
  name:string = ''
  patronamic:string = ''

 
  constructor(private http: HttpClient){}

async ngOnInit(){
  // Получение всех данных
  await this.http.get(this.urlConnect).subscribe((response) => { this.query = response })
}
reloadPage(){
  location.reload()
  this.ngOnInit()
}

addNewPerson(){
    this.visibleAddNewPerson = true
    this.visibleUpdatePerson = false

    let person = new Person(this.surname, this.name, this.patronamic)
    if(person.surname !== '' || person.name !== '' || person.patronamic !== ''){
      const myHeader = new HttpHeaders().set('Content-Type','application/json')
    
      this.http.put(this.urlConnect, person, {headers:myHeader})
        .subscribe(res => console.log(res))    
        this.reloadPage()
    }
  }
  showUpdatePersonForm(index:number){
    this.visibleAddNewPerson = false
    this.visibleUpdatePerson = true

    //Обнуление данных
      this.surname = ''
      this.name = ''
      this.patronamic = ''

    this.selectedIndex = index

    this.surname = this.query[index].surname
    this.name = this.query[index].name
    this.patronamic = this.query[index].patronamic
  }
  updatePerson(){

    // Изменим данных в основной коллекции
    this.query[this.selectedIndex].surname = this.surname
    this.query[this.selectedIndex].name = this.name
    this.query[this.selectedIndex].patronamic = this.patronamic

    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    this.http.post(this.urlConnect, this.query[this.selectedIndex], {headers:myHeader})
    .subscribe(res => console.log(res))
    this.reloadPage()

  }

  removePerson(index:number){
    let indexRemove = this.query[index].id
    let url = `http://localhost:3001/api/persons/?id=${indexRemove}`

    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    this.http.delete(url, {headers:myHeader})
    .subscribe(()=> { console.log('Success');
    })
    this.reloadPage()
  }




}
