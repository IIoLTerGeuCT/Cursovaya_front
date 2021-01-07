import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { PriceList} from '../app.component'

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  query:any
  urlConnect:string = 'http://localhost:3001/api/priceLists'

  visibleAddNewPriceList:boolean = false
  visibleUpdatePriceList:boolean = false
  selectedIndex:number = 0
  
  type:string = ''
  price:number = 0

  price_lists:PriceList[] = []
 
  constructor(private http: HttpClient){}

async ngOnInit(){
 await this.http.get(this.urlConnect).subscribe((response) => { this.query = response })

}
reloadPage(){
  location.reload()
  this.ngOnInit()
}

addNewItem(){

  this.visibleAddNewPriceList = true
  this.visibleUpdatePriceList = false

  let priceItem = new PriceList(this.type, this.price)
  if(priceItem.type !== ''|| priceItem.price !== 0){

    const myHeader = new HttpHeaders().set('Content-Type','application/json')
    this.http.put(this.urlConnect, priceItem, {headers:myHeader})
    .subscribe()
    this.reloadPage()
  }
}
async showUpdatePriceList(index:number){
  this.visibleAddNewPriceList = false
  this.visibleUpdatePriceList = true

  this.type = ''
  this.price = 0

 
  this.selectedIndex = index
 
  
  this.type = this.query[index].type
  this.price = this.query[index].price
  
}
updateItem(){
  
  this.query[this.selectedIndex].type = this.type
  this.query[this.selectedIndex].price = this.price
  
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.post(this.urlConnect, this.query[this.selectedIndex], {headers:myHeader})
  .subscribe(res => console.log(res))
  this.reloadPage()

}
removeItem(index:number){
  let indexRemove = this.query[index].id
  let url = `http://localhost:3001/api/priceLists/?id=${indexRemove}`
  
  const myHeader = new HttpHeaders().set('Content-Type','application/json')
  this.http.delete(url, {headers:myHeader})
  .subscribe(()=> { console.log('Success');
  })
  this.reloadPage()
}


}
