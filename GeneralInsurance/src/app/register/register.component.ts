import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../lnsurance.service';
import { Users } from '../Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName:string ="";
  userEmail:string = "";
  password: string="";
  userPhone:string = "";
  aadharCard:string = "";
  dateOfBirth!: Date;
  hide:boolean = true;
  user:Users=new Users();
  passwordPtn ='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  phoneptn='^((\\+91-?)|0)?[0-9]{10}$'
  emailptn='[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  aadharptn='^((\\+91-?)|0)?[0-9]{12}$'
  
  constructor(private router:Router,private service:LoginService) { }

  ngOnInit(): void {
  }

  register(regform:NgForm){
    this.user.userName=this.userName
    this.user.userEmail=this.userEmail
    this.user.userPassword=this.password
    this.user.userPhone=this.userPhone
    this.user.userDateOfBirth=this.dateOfBirth
    this.user.userAadharNo=this.aadharCard
    this.service.registerUser(this.user).subscribe(
      fetchedData=>{
        Swal.fire({
          title: "Registration Successful",
          text: "Please login to continue.",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate(['/login']);
      }
    );
  }
}
