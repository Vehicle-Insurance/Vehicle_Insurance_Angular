import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { CalculatePremiumComponent } from './calculate-premium/calculate-premium.component';
import { ClaimComponent } from './claim/claim.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PolicyComponent } from './policy/policy.component';
import { RegisterComponent } from './register/register.component';
import { RenewComponent } from './renew/renew.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"userProfile",component:UserProfileComponent},
  {path:"register",component:RegisterComponent},
  {path:"buyInsurance",component:BuyInsuranceComponent},
  {path:"policy",component:PolicyComponent},
  {path:"calPremium",component:CalculatePremiumComponent},
  {path:"renew",component:RenewComponent},
  {path:"claim",component:ClaimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
