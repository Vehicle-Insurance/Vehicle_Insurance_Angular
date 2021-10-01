import { Claims } from "./Cliams";
import { Transaction } from "./Transaction";
import { Users } from "./Users";
import { Vehicle } from "./Vehicle";

export class Policy
{
    policyId:number=0;
    policyPlan:string="";
    policyStartDate!: Date;
    policyDuration:number=0;
    policyFor:string="";
    policyPremiumAmount:number=0;
    policyCoverageAmount:number=0;
    //userID:number=0;
    user:Users=new Users()
    vehicle:Vehicle=new Vehicle()
    //vehicleId:number=0;
    //tranactionId:number=0;
    transac:Transaction=new Transaction()
    claimList:Claims[]=[]

    constructor()
    {
        
    }

}