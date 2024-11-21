import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./AuthenticationCRUD/login/login.component";
import {ForbiddenComponent} from "./AuthenticationCRUD/forbidden/forbidden.component";
import {ListusersComponent} from "./AuthenticationCRUD/listusers/listusers.component";
import {ChangepasswordComponent} from "./AuthenticationCRUD/changepassword/changepassword.component";
import {ForgetpassComponent} from "./AuthenticationCRUD/forgetpass/forgetpass.component";
import {MdpoubliComponent} from "./AuthenticationCRUD/mdpoublie/mdpoublie.component";
import {UpdateuserComponent} from "./AuthenticationCRUD/updateuser/updateuser.component";
import {AdduserComponent} from "./AuthenticationCRUD/adduser/adduser.component";
import {DetailsuserComponent} from "./AuthenticationCRUD/detailsuser/detailsuser.component";
import {HomeComponent} from "./home/home.component";
import {OffreComponent} from "./Offre/offre.component";
import {ChatComponent} from "./chat/chat.component";
import {OffredetailsComponent} from "./Offre/offredetails/offredetails.component";

const routes: Routes = [
  {path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'forbiden',component:ForbiddenComponent},
  {path:"listusers",component:ListusersComponent},
  {path:"changepass",component:ChangepasswordComponent},
  {path:"resetpwd",component:ForgetpassComponent},
  {path:"mdpoublie",component:MdpoubliComponent},
  {path:"register",component:AdduserComponent},
  {path:"updateuser/:id",component:UpdateuserComponent},
  {path:"detailsuser/:id",component:DetailsuserComponent},
  {path:"offre/:id",component:OffreComponent},
  {path:"detailsoffre/:id",component:OffredetailsComponent},

  {path:"chat/:id",component:ChatComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
