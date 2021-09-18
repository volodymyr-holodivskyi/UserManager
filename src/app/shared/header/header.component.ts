import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = '';
  userEmail: string | null = '';
  constructor() {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
    this.userEmail = localStorage.getItem('email');
  }
}
