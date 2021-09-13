import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routes = [
    {path:'/dashboard',title:'Home'},
    {path:'/users',title:'Users'},
    {path:'/my-page',title:'My Page'},
    {path:'/login',title:'Logout'}
  ]
}
