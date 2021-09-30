import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Users } from './Users';
import { LoginStatus } from './loginStatus';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // http://localhost:8050/app/login/101/password1
  private baseUrl:string="http://localhost:8050/app/login/"
  private res: string="";
  constructor(private httpClient:HttpClient) { }

  login(userId:number,password:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(this.httpClient.get<string>(this.baseUrl+userId+"/"+password,{ headers, }))
    return this.httpClient.get<string>(this.baseUrl+userId+"/"+password);
    
  }
  getUsers(){
    return this.httpClient.get<Users[]>("http://localhost:8050/app/"+"users")
  }

  loginUser(user:Users){
    return this.httpClient.get<LoginStatus>("http://localhost:8050/app/login/"+user.userId+"/"+user.userPassword)
  }
}
