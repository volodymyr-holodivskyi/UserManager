import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
   }
  ngOnInit(): void {
    
  }
  routes = [
    {path:'/dashboard',title:'Home'},
    {path:'/users',title:'Users'},
    {path:'/my-page',title:'My Page'},
    {path:'/login',title:'Logout'}
  ]
}
