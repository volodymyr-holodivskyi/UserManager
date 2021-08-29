import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { User } from '../../models/user';

import { ToastrService,ToastContainerDirective } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/notify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userName:string='';
  userEmail:string='';
  userPassword:string='';
  page:number=0;
  pageSize:number=1;
  maxPageCount:number=1;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective|undefined;
  constructor(private httpService:HttpService,private toastrService:ToastrService,private notifyService:NotifyService) {

   }

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.httpService.getUsers(0,-1).subscribe((data)=>{
      this.maxPageCount=data.length
    })
    this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
      this.users=data;
      this.users.sort((a:any,b:any)=>a.name-b.name);
    })
  }
  users:User[]=[
  ]
  prevPage(){
    if(this.page>0){
      this.page--;
      this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
        this.users=data;
        this.users.sort((a:any,b:any)=>a.name-b.name);
      })
    }
  }
  nextPage(){
    if(this.page<this.maxPageCount){
      this.page++;
      this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
        this.users=data;
        this.users.sort((a:any,b:any)=>a.name-b.name);
      })
    }
  }
  addUser(){
      this.httpService.addUser(this.userName,this.userEmail,this.userPassword).subscribe((data:any)=>{
        if(data==='New user created'){
          this.notifyService.showMessage('success',data,'Congratulations');
          this.maxPageCount++;
          this.userName='';
          this.userEmail='';
          this.userPassword='';
        }else{
          this.notifyService.showMessage('error','Incorect input','Error')
        }
      })
  }
}
