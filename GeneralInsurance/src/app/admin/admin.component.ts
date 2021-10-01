import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Claims } from '../Cliams';
import { LoginService } from '../lnsurance.service';
import { Policy } from '../Policy';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  claimList : Claims[ ] =[];
  p:Policy=new Policy()
  claimStatus:string=""
  status:string[]=["ACCEPTED","REJECTED"]

  

  claims(claimHistoryform:NgForm){
    
  }
  constructor(private service:LoginService) {
      
      
      //   window.location.reload()
      
      // window.stop()
   }

  ngOnInit(): void {
   
    this.getClaims()
  }

  getClaims(){
    
    this.service.getCliams().subscribe(
      data=>{
        this.claimList=data;
        for(let c of this.claimList){
          this.service.getPolicyByClaim(c.claimId).subscribe(
            data=>{
              this.p=data
              c.policyId=this.p.policyId
              c.vehicleType=this.p.vehicle.vehicleType
            }
          )

        }
      }
    )
  }

  approve(id:number){
    for(let claim of this.claimList){
      if (claim.claimId==id){
        claim.claimStatus="APPROVED"
        this.service.addCliam(claim,claim.policyId).subscribe(
          data=>{
            console.log(data)
            Swal.fire({
              title: "Claim Approved",
               text:"Claim Id "+claim.claimId,
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.getClaims()
          //  const n=this.claimList.indexOf(claim)
          //  delete this.claimList[n]
          }
        )
      }
    }
  }



  reject(id:number){
    for(let claim of this.claimList){
      if (claim.claimId==id){
        claim.claimStatus="REJECTED"
        this.service.addCliam(claim,claim.policyId).subscribe(
          data=>{
            console.log(data)
            Swal.fire({
              title: "Claim Rejected",
               text:"Claim Id "+claim.claimId,
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.getClaims()
          //  const n=this.claimList.indexOf(claim)
          //  delete this.claimList[n]
          }
        )
      }
    }
  }

}
