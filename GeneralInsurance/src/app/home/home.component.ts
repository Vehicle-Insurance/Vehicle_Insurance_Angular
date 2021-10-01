import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId:any
  constructor(private router:Router) {
    
   }
   
  ngOnInit(): void {
    
    this.userId = localStorage.getItem('UserId');
  }
  signin(){
  this.router.navigate(['/login']);
  }
  logout() {
    localStorage.removeItem("UserId");
  }
  buy(){
    if(this.userId){
      this.router.navigate(['/buyInsurance'])
    }
    else{
      Swal.fire({
        title: "Login Required",
        text:"Please login or register",
        icon: "error",
        confirmButtonText: "Okay"
      });
      this.signin()
    }
  }
  renew(){
    if(this.userId){
      this.router.navigate(['/userProfile'])
    }
    else{
      Swal.fire({
        title: "Login Required",
        text:"Please login or register",
        icon: "error",
        confirmButtonText: "Okay"
      });
      this.signin()
    }
  }
  claim(){
    if(this.userId){
      this.router.navigate(['/userProfile'])
    }
    else{
      Swal.fire({
        title: "Login Required",
        text:"Please login or register",
        icon: "error",
        confirmButtonText: "Okay"
      });
      this.signin()
    }
  }
}
