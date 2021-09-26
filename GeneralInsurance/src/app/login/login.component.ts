import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userEmail:String = "";
  userPassword:String = "";
  hide:boolean = true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  

 login(loginForm:NgForm){
   
 }

}
