import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get('http://127.0.0.1:3000/api/v1/users').pipe(
                map((data:any)=>{
                  let userList=data;
                  return userList.map(function(user:any):User{
                   
                    return new User(user.name,user.email,user.password,user.created_at,user.updated_at,user.id)
                  })
                })
              )
  }
  getUser(id:number):Observable<User>{
    const params = new HttpParams()
                      .set('id',id);
    return this.http.get(`http://127.0.0.1:3000/api/v1/users/${id}`,{params}).pipe(
                map((data:any)=>{
                  let user=data;
                    return new User(user.name,user.email,user.password,user.created_at,user.updated_at,user.id)
                  
                })
              )
  }
}
