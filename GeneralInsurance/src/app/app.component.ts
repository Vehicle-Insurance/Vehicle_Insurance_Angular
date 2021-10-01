import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GeneralInsurance';
  
  hide:boolean = true;
  userId:any=null
  adminId:any=null
  constructor(private router:Router) { }
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
    this.adminId=localStorage.getItem('AdminId')
  }

  signin(){
    this.router.navigate(['/login']);
    }
    logout() {
      localStorage.removeItem("UserId");
      localStorage.removeItem("AdminId");
    }
}
