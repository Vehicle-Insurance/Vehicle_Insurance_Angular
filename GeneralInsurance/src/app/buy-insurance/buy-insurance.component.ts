import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { url } from 'inspector';
import Swal from 'sweetalert2';
import { LoginService } from '../lnsurance.service';
import { Vehicle } from '../Vehicle';

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

  vehicleType:string=""
  manufacturer:string=""
  model:string=""
  registrationNumber:string=""
  registrationState:string=""
  engineNumber:string=""
  chassisNumber:string=""
  age:number=0
  vehicle:Vehicle=new Vehicle()
  userId:any
  vehicleId:number=0
  constructor(private router:Router,private service:LoginService) { }

  ngOnInit(): void {
    this.userId=Number(localStorage.getItem("UserId"))
  }

  onItemChange(value:string){
    this.vehicleType=value;
 }

 buy(buyform:NgForm){
   if(this.userId!=null){
      this.vehicle.registrationNumber=this.registrationNumber
      this.vehicle.registrationState=this.registrationState
      this.vehicle.manufacturer=this.manufacturer
      this.vehicle.model=this.model
      this.vehicle.age=this.age
      this.vehicle.engineNumber=this.engineNumber
      this.vehicle.chassisNumber=this.chassisNumber
      this.vehicle.vehicleType=this.vehicleType
      
      this.service.addVehicle(this.vehicle,this.userId).subscribe(
        data=>{
          console.log(data)
          this.vehicleId=data.vehicleId
          localStorage.setItem('vehicleId',this.vehicleId.toString())
          Swal.fire({
            title: "Vehicle added",
             text:"Please enter policy plan",
             icon: "success",
             confirmButtonText: "Okay"
         });
         this.router.navigate(['/policy'])
         //this.router.navigateByUrl('/policy',{queryParam:{v:this.vehicle}})
        } 
      )
   }
   else{
    Swal.fire({
      title: "Login",
       text:"Please login to proceed",
       icon: "error",
       confirmButtonText: "Okay"
   });
   this.router.navigate(['/login'])
   }
}

}
