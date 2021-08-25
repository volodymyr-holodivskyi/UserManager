import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getUsers().subscribe((data:User[])=>this.users=data)
  }
  users:User[]=[
  ]

}
