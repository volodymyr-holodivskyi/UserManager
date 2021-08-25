import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id:number=0;
  user:User=new User('','','','','',0);
  constructor(private route:ActivatedRoute,private httpService:HttpService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
  )
  .subscribe(data=> this.id = +data);
    this.httpService.getUser(this.id).subscribe((data:User)=>{
       this.user=data}
      );
  }

}
