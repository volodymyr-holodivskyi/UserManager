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
  pageSize:number=10;
  maxPageCount:number=1;
  users:User[]=[];
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective|undefined;
  @ViewChild(ToastContainerDirective, { static: true })
  deleteContainer: ToastContainerDirective|undefined;
  constructor(private httpService:HttpService,private toastrService:ToastrService,private notifyService:NotifyService) {

   }

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.toastrService.overlayContainer = this.deleteContainer;
    this.httpService.getUsersCount().subscribe((data)=>{
      this.maxPageCount=Math.round(data/this.pageSize)
    })
    this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
      this.users=data;
      this.users.sort((a:any,b:any)=>a.name-b.name);
    })
    
    setInterval(()=>{
      this.httpService.getRefreshToken(localStorage.getItem('email'),localStorage.getItem('refreshToken')).subscribe((data:any)=>{
      })
    },60000);
  }
  
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
    if(this.page<this.maxPageCount&&this.maxPageCount>10){
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
          this.httpService.getUsersCount().subscribe((data)=>{
            this.maxPageCount=Math.round(data/this.pageSize)
          })
          this.userName='';
          this.userEmail='';
          this.userPassword='';
          this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
            this.users=data;
            this.users.sort((a:any,b:any)=>a.name-b.name);
          })
        }else{
          this.notifyService.showMessage('error','Incorect input','Error')
        }
      })
  }
  deleteUser(index:number){
    this.httpService.deleteUser(index).subscribe((data:any)=>{
      if(data){
        this.notifyService.showMessage('success',`Deleted user ${index}`,'Congratulations');
        this.httpService.getUsersCount().subscribe((data)=>{
          this.maxPageCount=Math.round(data/this.pageSize)
        })
        this.httpService.getUsers(this.page,this.pageSize).subscribe((data:User[])=>{
          this.users=data;
          this.users.sort((a:any,b:any)=>a.name-b.name);
        })
      }else{
        this.notifyService.showMessage('error','Invalid operation','Error')
      }
    })
  }
  
}
