import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../lnsurance.service';
import { Users } from '../Users';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userEmail:string="";
  userPassword: string="";
  hide:boolean = true;
  res:string="";
  userList:Users[]=[];
  userType:string="";
  user:Users=new Users();
  passwordPtn ='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  emailptn='[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
    
  }

  onItemChange(value: any){
    this.userType=value;
 }

 

 login(loginForm:NgForm){
    
      this.user.userEmail=this.userEmail
      this.user.userPassword=this.userPassword
      this.loginService.loginUser(this.user).subscribe(
        data=>{
          console.log(data)
          if(data.userStatus == "Failed" || data.adminStatus=="Failed")
          {
            Swal.fire({
                 title: "Login Failed",
                  text:"Please check your credentials",
                  icon: "error",
                  confirmButtonText: "Okay"
              });
              loginForm.resetForm();
          }
          else if(data.userStatus=="Sucess"){
            localStorage.setItem('UserId', String(data.userId));
            Swal.fire({
              title: "Welcome "+data.userName+" :-)",
               text:"Please avail services",
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.router.navigate(['/home']);
          }
          else if(data.adminStatus=="Sucess"){
            localStorage.setItem('AdminId', String(data.adminId));
            Swal.fire({
              title: "Admin Login Success",
               text:"Please avail services",
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.router.navigate(['/admin']);
           
          }
        }
      )
    
 }
//  login(loginForm:NgForm){
//    this.loginService.login(this.userId,this.userPassword).subscribe(
//      (data)=>{
//       console.log(JSON.stringify(data));
//       this.res=data;
//     }
//    )
//    console.log(JSON.stringify(this.res))
//    if(this.res==="User"){
//      this.router.navigate(['/userProfile'])
//    }
//    else if(this.res==="Admin"){
//      this.router.navigate(['/admin'])
//    }
//    else{
//      this.router.navigate([''])
//    }
//  }

}
