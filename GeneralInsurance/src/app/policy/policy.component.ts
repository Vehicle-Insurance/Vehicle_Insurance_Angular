import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../lnsurance.service';
import { Policy } from '../Policy';
import { Transaction } from '../Transaction';
import { Vehicle } from '../Vehicle';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  planType:string=""
  years:number=0
  vehicle:Vehicle=new Vehicle()
  pol:Policy=new Policy()
  vehicleId:number=0
  userId:number=0
  amount:number=0
  trans:Transaction=new Transaction()

  onItemChange1(value1:string){
    this.planType=value1;
 }
 onItemChange2(value2:number){
  this.years=value2;
}

  constructor(private router:Router,private service:LoginService) { 
    this.vehicleId=Number(localStorage.getItem("vehicleId"))
    this.userId=Number(localStorage.getItem("UserId"))
    this.service.getVehicle(this.vehicleId).subscribe(
      data=>{
        console.log(data)
        this.vehicle=data;
      }
    )
    
  }

  ngOnInit(): void {
   
    
  }

  policy(planform:NgForm){
    this.pol.userID=this.userId
    this.pol.policyPlan=this.planType
    this.pol.vehicleId=this.vehicleId
    this.pol.policyDuration=this.years
    this.pol.policyFor=this.vehicle.vehicleType
    this.pol.policyStartDate=new Date
    if(this.pol.policyFor=="Two wheeler")
    {
       this.pol.policyPremiumAmount = 15000*(this.vehicle.age/5);
       
    }
    else
    {
      this.pol.policyPremiumAmount = 20000*(this.vehicle.age/5);
    }
    this.pol.policyCoverageAmount=this.pol.policyPremiumAmount*10
    this.amount=this.pol.policyPremiumAmount*this.years
    this.trans.transactionAmount=this.amount
    this.trans.transactionMode="online"
    this.trans.transactionStatus="completed"
    this.service.addTransaction(this.trans).subscribe(
      data=>{
        this.trans=data;
        Swal.fire({
          title: "Transaction made",
           text:this.amount+" Paid !!!",
           icon: "success",
           confirmButtonText: "Okay"
       });
      }
      
    )
    this.service.addPolicy(this.pol,this.userId,this.vehicleId,this.trans.transactionId).subscribe(
      data=>{
        this.pol.policyId=data.policyId;
        Swal.fire({
          title: "Policy added",
           text:this.pol.policyId+" is your Policy Id",
           icon: "success",
           confirmButtonText: "Okay"
       });
       this.router.navigate(['/home'])
      }
    )
  }

}
