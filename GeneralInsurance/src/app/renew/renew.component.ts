import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../lnsurance.service';
import { Policy } from '../Policy';
import { Transaction } from '../Transaction';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  planType:string=""
  years:number=0
  pol:Policy=new Policy()
  policyId:number=0
  amount:number=0
  transac:Transaction=new Transaction()

  constructor(private route:Router,private service:LoginService) { }

  ngOnInit(): void {
    this.policyId=Number(localStorage.getItem("policyId"))
    this.service.getPolicy(this.policyId).subscribe(
      data=>{
        this.pol=data
      }
    )
  }

  onItemChange1(value1:string){
    this.planType=value1;
  }
  onItemChange2(value2:number){
    this.years=value2;
  }

  policy(planForm:NgForm){
    this.pol.policyPlan=this.planType
    this.pol.policyDuration=Number(this.pol.policyDuration)+Number(this.years)
    console.log(this.pol)
    if(this.pol.policyFor=="Two wheeler")
    {
       this.pol.policyPremiumAmount = 15000*(this.pol.vehicle.age/5);
       console.log(this.pol.policyPremiumAmount)
    }
    else
    {
      this.pol.policyPremiumAmount = 20000*(this.pol.vehicle.age/5);
    }
    this.pol.policyCoverageAmount=this.pol.policyPremiumAmount*10
    this.amount=this.pol.policyPremiumAmount*this.years
    this.transac.transactionAmount=this.amount
    //console.log(this.amount)
    this.transac.transactionMode="online"
    this.transac.transactionStatus="completed"
    this.service.addTransaction(this.transac).subscribe(
    data=>{
      this.transac=data;
      console.log(this.transac)
      Swal.fire({
        title: "Transaction made",
        text:this.amount+" Paid !!!",
        icon: "success",
        confirmButtonText: "Okay"
    });
   })
    this.pol.transac=this.transac
    this.service.renew(this.pol).subscribe(
    data=>{
      this.pol=data
    })
    
    this.route.navigate(["/userProfile"])
  }


  
}
