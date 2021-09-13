import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';

import { loginData } from '../models/loginData';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,private nofifyService:NotifyService) { }

  login(email:string,password:string):Observable<loginData>{
    const body = {
      email:email,
      password:password
    }
    return this.http.post('http://127.0.0.1:3000/auth/v1/',body).pipe(
      map((data:any)=>{  
        return new loginData(data.user,data.token,data.refreshToken)
      })
    )
  }

  getRefreshToken(email:string|null,refreshToken:string|null){
    const body = {
      email:email,
      refreshToken:refreshToken
    }
    return this.http.post('http://127.0.0.1:3000/auth/v1/token',body).pipe(
      map((data:any)=>{
        localStorage.setItem('token',data.token);
      })
    )
  }
  
  getUsers(page:number=0,pageSize:number=0):Observable<User[]>{
    const params = new HttpParams()
                  .set('page',page)
                  .set('pageSize',pageSize)
    const headers = new HttpHeaders()
                    .set('Authorization','Bearer '+localStorage.getItem('token'))
    return this.http.get('http://127.0.0.1:3000/api/v1/users',{params,headers}).pipe(
                map((data:any)=>{
                  let userList=data;
                  return userList.map(function(user:any):User{
                   
                    return new User(user.name,user.email,user.password,user.created_at,user.updated_at,user.id)
                  })
                })
              )
  }
  getUsersCount():Observable<number>{
    const headers = new HttpHeaders()
                      .set('Authorization','Bearer '+localStorage.getItem('token'))
    return this.http.get('http://127.0.0.1:3000/api/v1/count',{headers}).pipe(
      map((data:any)=>{
        return data;
      })
    )
  }
  getUser(id:number):Observable<User>{
    const params = new HttpParams()
                      .set('id',id);
                      const headers = new HttpHeaders()
                      .set('Authorization','Bearer '+localStorage.getItem('token'))
    return this.http.get(`http://127.0.0.1:3000/api/v1/users/${id}`,{params,headers}).pipe(
                map((data:any)=>{
                  let user=data;
                    return new User(user.name,user.email,user.password,user.created_at,user.updated_at,user.id)
                  
                })
              )
  }

  addUser(name:string,email:string,password:string){
    const body = {
      name:name,
      email:email,
      password:password
    }
    const headers = new HttpHeaders()
                      .set('Authorization','Bearer '+localStorage.getItem('token'))
    return this.http.post('http://127.0.0.1:3000/api/v1/users',body,{headers});
  }

  editUser(id:number,name?:string,email?:string,password?:string){
    const params = new HttpParams()
                      .set('id',id);
                      const headers = new HttpHeaders()
                      .set('Authorization','Bearer '+localStorage.getItem('token'))
    const body = {
        name:name,
        email:email,
        password:password
    }
      return this.http.put(`http://127.0.0.1:3000/api/v1/users/`,body,{params,headers})
  }

  deleteUser(id:number){
    const params = new HttpParams()
                      .set('id',id);
    const headers = new HttpHeaders()
                      .set('Authorization','Bearer '+localStorage.getItem('token'))
      return this.http.delete(`http://127.0.0.1:3000/api/v1/users/${id}`,{params,headers})
  }
}
