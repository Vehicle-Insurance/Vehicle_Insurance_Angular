import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css']
})
export class CalculatePremiumComponent implements OnInit {

  vehicleType:string="";
  age:number=0
  Amount:number = 0;
  premiumAmount:number = 0;
  model:string = "";

  onItemChange(value:string){
    this.vehicleType=value;
 }

 onAgeChange(value:number)
 {
   this.age = value;
 }
  calculate(premiumform:NgForm){
    
  }
  constructor() { }

  ngOnInit(): void {
  }

  calpremium()
  {
    if(this.age<=0)
    {
         Swal.fire({
         title: "Invalid age",
         text:"Please enter age more than 0",
         icon: "error",
         confirmButtonText: "Okay"
     });
    }
    else if(this.age > 0)
    {
    if(this.vehicleType=="Two wheeler")
    {
       this.Amount = 15000*(this.age/5);
    }
    else
    {
      this.Amount = 20000*(this.age/5);
    }
    this.premiumAmount = this.Amount;
  }
}

}
