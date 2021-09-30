import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
  }
  signin(){
  this.router.navigate(['/login']);
  }
  logout() {
    localStorage.removeItem("UserId");
  }
}
