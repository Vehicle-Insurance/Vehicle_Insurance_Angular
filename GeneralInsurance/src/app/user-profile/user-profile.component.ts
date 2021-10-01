import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Claims } from '../Cliams';
import { LoginService } from '../lnsurance.service';
import { Policy } from '../Policy';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  policyList : Policy[ ] =[]
  claimList : Claims[ ] =[];
  userId:number=0;
  i:boolean=false;
  reasonOfClaim:string=""
  c:Claims=new Claims()
  pol:Policy=new Policy()
  amount:number=0
  
  constructor(private route:Router,private service:LoginService) {
    this.userId=Number(localStorage.getItem("UserId"))
   }

   

  onItemChange(value:string){
    this.reasonOfClaim=value;
 }

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.service.getPolicyById(this.userId).subscribe(
      data=>{
        console.log(data)
        this.policyList=data
        for(let p of this.policyList){
          if(p.claimList.length>0){
            console.log(p.claimList)
            for(let c of p.claimList){
              c.policyId=p.policyId
              c.vehicleType=p.vehicle.vehicleType
              console.log(c)
              this.claimList.push(c)
            }
          }
        }
      }
    )
  }

  claim(id:number){
    this.service.getPolicy(id).subscribe(
      data=>{
        this.pol=data
        console.log(this.pol)
      }
    )
    this.i=true
    
  }

  renew(id:number){
    localStorage.setItem("policyId",String(id))
    this.route.navigate(['/renew'])
  }
  user(dashboardform:NgForm){
    
  }
  claims(claimForm:NgForm){
    
    this.c.vehicleType=this.pol.vehicle.vehicleType
    this.c.policyId=this.pol.policyId
    this.c.reasonOfClaim=this.reasonOfClaim
    this.c.claimStatus="PENDING"
    this.c.claimDate=new Date
    this.amount=this.pol.policyCoverageAmount
    if(this.pol.policyPlan=="Third Party Liability"){
      this.amount=this.amount/2
    }
    this.c.claimAmount=this.amount
    console.log(this.c)
    this.service.addCliam(this.c,this.pol.policyId).subscribe(
      data=>{
        this.c=data
        console.log(this.c)
        Swal.fire({
          title: "Claim made",
           text: "Request sent for approval !!!",
           icon: "success",
           confirmButtonText: "Okay"
       });
      }
    )
    //localStorage.removeItem("policyId")
    this.i=false
    this.init()
    this.route.navigate(['/userProfile'])
    
  }

}
