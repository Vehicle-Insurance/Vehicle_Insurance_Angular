import { Policy } from "./Policy";

export class Claims
{
      claimId:number = 0;
      claimDate!: Date;
      reasonOfClaim:string="";
      claimAmount:number=0;
      claimStatus:string="";
      policyId:number=0;
      vehicleType:string="";

      constructor()
      {
            
      }
}