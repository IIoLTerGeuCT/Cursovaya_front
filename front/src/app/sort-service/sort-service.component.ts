import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import {Employee, Person, Client, PriceList , Car, Service} from '../app.component'

@Component({
  selector: 'app-sort-service',
  templateUrl: './sort-service.component.html',
  styleUrls: ['./sort-service.component.css']
})
export class SortServiceComponent implements OnInit {

  constructor(private http: HttpClient){}

 async ngOnInit() {

  }

}
