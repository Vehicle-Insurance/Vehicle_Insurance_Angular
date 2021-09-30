import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Users } from './Users';
import { LoginStatus } from './loginStatus';
import { Vehicle } from './Vehicle';
import { Policy } from './Policy';
import { Transaction } from './Transaction';
import { Claims } from './Cliams';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // http://localhost:8050/app/login/101/password1
  private baseUrl:string="http://localhost:8050/app/"
  private res: string="";
  constructor(private httpClient:HttpClient) { }

  login(userId:number,password:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(this.httpClient.get<string>(this.baseUrl+userId+"/"+password,{ headers, }))
    return this.httpClient.get<string>(this.baseUrl+userId+"/"+password);
    
  }
  getUsers(){
    return this.httpClient.get<Users[]>(this.baseUrl+"users")
  }

  loginUser(user:Users){
    return this.httpClient.get<LoginStatus>(this.baseUrl+"login/"+user.userEmail+"/"+user.userPassword)
  }

  registerUser(user:Users){
    return this.httpClient.post<Users>(this.baseUrl+"addUser",user)
  }

  addVehicle(v:Vehicle,userId:number){
    return this.httpClient.post<Vehicle>(this.baseUrl+"addVehicle/"+userId,v)
  }

  getVehicle(vId:number){
    return this.httpClient.get<Vehicle>(this.baseUrl+"getVehicle/"+vId)
  }

  addPolicy(p:Policy,uId:number,vId:number,tId:number){
    return this.httpClient.post<Policy>(this.baseUrl+"addPolicy/"+uId+"/"+vId+"/"+tId,p)
  }

  addTransaction(t:Transaction){
    return this.httpClient.post<Transaction>(this.baseUrl+"addTransaction",t)
  }

  getCliams(){
    return this.httpClient.get<Claims[]>(this.baseUrl+"getClaims")
  }

  addCliam(c: Claims) {
    return this.httpClient.post<Claims>(this.baseUrl+"addClaim",c)
  }
}
