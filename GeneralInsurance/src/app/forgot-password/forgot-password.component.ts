import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../lnsurance.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail:string=""
  userPassword:string=""
  hide:boolean=false
  i:boolean=false
  passwordPtn ='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  emailptn='[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  otp:string=""
  actualOtp:string=""
  constructor(private service:LoginService,private route:Router) { }

  ngOnInit(): void {
  }

  forgot(passwordForm:NgForm){
    if(this.actualOtp===this.otp){
      this.service.setPassword(this.userEmail,this.userPassword).subscribe(
        data=>{
          if(data=="1"){
            Swal.fire({
              title: "Password Reseted",
               text:"Please login to continue",
               icon: "success",
               confirmButtonText: "Okay"
           });
          }
          this.route.navigate(['/login'])
        }
      )

    }
    else{
      alert("enter correct details")
      passwordForm.reset()
    }
  }

  generateOtp(){
    this.service.generateOtp(this.userEmail).subscribe(
      data=>{
        this.actualOtp=data.toString()
        alert("OTP sent to "+this.userEmail)
      }
    )
    this.i=true
  }
}
