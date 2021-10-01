import { Users } from "./Users";

export class Vehicle
{
      vehicleId:number=0;
      registrationNumber:string="";
      registrationState:string="";
      manufacturer:string="";
      model:string="";
      vehicleType:string="";
      engineNumber:string="";
      chassisNumber:string="";
      age:number=0;
      user:Users=new Users();

      constructor()

      {
            
      }

}