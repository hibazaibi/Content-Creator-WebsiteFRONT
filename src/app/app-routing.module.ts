import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./AuthenticationCRUD/login/login.component";
import {ForbiddenComponent} from "./AuthenticationCRUD/forbidden/forbidden.component";
import {ListcreatorsComponent} from "./listcreators/listcreators.component";
import {ChangepasswordComponent} from "./AuthenticationCRUD/changepassword/changepassword.component";
import {ForgetpassComponent} from "./AuthenticationCRUD/forgetpass/forgetpass.component";
import {MdpoubliComponent} from "./AuthenticationCRUD/mdpoublie/mdpoublie.component";
import {UpdateuserComponent} from "./AuthenticationCRUD/updateuser/updateuser.component";
import {AdduserComponent} from "./AuthenticationCRUD/adduser/adduser.component";
import {DetailsuserComponent} from "./AuthenticationCRUD/detailsuser/detailsuser.component";
import {HomeComponent} from "./home/home.component";
import {OffreComponent} from "./Offre/offre.component";
import {ChatComponent} from "./chat/chat.component";
import {OffrelistComponent} from "./Offre/offrelist/offrelist.component";
import {ListusersComponent} from "./listusers/listusers.component";
import {DisputeComponent} from "./dispute/dispute.component";
import {OffredetailsComponent} from "./Offre/offredetails/offredetails/offredetails.component";
import {EvaluationComponent} from "./evaluation/evaluation.component";
import {AuthGuard} from "./_auth/shared/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClientdashboardComponent} from "./dashboard/clientdashboard/clientdashboard.component";
import {CreatordashboardComponent} from "./dashboard/creatordashboard/creatordashboard.component";
import {ProfilComponent} from "./AuthenticationCRUD/profil/profil.component";
import {DisputelistComponent} from "./dispute/disputelist/disputelist.component";

const routes: Routes = [
  {path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'forbiden',component:ForbiddenComponent},
  {path:"listcreators",component:ListcreatorsComponent},
  {path:"listusers",component:ListusersComponent},
  {path:"changepass",component:ChangepasswordComponent},
  {path:"resetpwd",component:ForgetpassComponent},
  {path:"mdpoublie",component:MdpoubliComponent},
  {path:"register",component:AdduserComponent},
  {path:"updateuser/:id",component:UpdateuserComponent},
  {path:"detailsuser/:id",component:DetailsuserComponent},
  {path:"offre/:id",component:OffreComponent,canActivate:[AuthGuard]},
  {path:"offrelist",component:OffrelistComponent},
  {path:"offredetails/:id",component:OffredetailsComponent},
  {path:"chat/:id",component:ChatComponent},
  {path:'dispute/:id',component:DisputeComponent},
  { path: "evaluation/:id", component: EvaluationComponent },
  {path:"dashboard",component:DashboardComponent},
  {path:"mydashboard",component:ClientdashboardComponent},
  {path:"mydashboard1",component:CreatordashboardComponent},
  {path:"profil",component:ProfilComponent},
  {path:'disputelist',component:DisputelistComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
