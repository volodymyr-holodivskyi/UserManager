import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../shared/http.service';
import { User } from '../../models/user';

import { ToastrService,ToastContainerDirective } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/notify.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit {
  userName:string='';
  userEmail:string='';
  userPassword:string='';
  id:number=0;
  
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective|undefined;
  constructor(private route:ActivatedRoute,private httpService:HttpService,private toastrService:ToastrService,private notifyService:NotifyService) { }

  editUser(){
    this.httpService.editUser(this.id,this.userName,this.userEmail,this.userPassword).subscribe((data:any)=>{
      this.notifyService.showMessage('success',data,'Congratulations');
    })
  }
  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id')))
  .subscribe(data=> this.id = +data);
    this.httpService.getUser(this.id).subscribe((data:User)=>{
       this.userName=data.name;
      this.userEmail=data.email;
      });
      setInterval(()=>{
        this.httpService.getRefreshToken(localStorage.getItem('email'),localStorage.getItem('refreshToken')).subscribe((data:any)=>{
        })
      },60000);
  }
  

}
