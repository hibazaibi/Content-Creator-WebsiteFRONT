

import { NgModule } from '@angular/core';
export class YourModule { }

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ForbiddenComponent} from "./AuthenticationCRUD/forbidden/forbidden.component";
import {ListcreatorsComponent} from "./listcreators/listcreators.component";
import {ForgetpassComponent} from "./AuthenticationCRUD/forgetpass/forgetpass.component";
import {AdduserComponent} from "./AuthenticationCRUD/adduser/adduser.component";
import {UpdateuserComponent} from "./AuthenticationCRUD/updateuser/updateuser.component";
import {LoginComponent} from "./AuthenticationCRUD/login/login.component";
import {ChangepasswordComponent} from "./AuthenticationCRUD/changepassword/changepassword.component";
import {MdpoubliComponent} from "./AuthenticationCRUD/mdpoublie/mdpoublie.component";
import {RestapiService} from "./restapi.service";
import { DetailsuserComponent } from './AuthenticationCRUD/detailsuser/detailsuser.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {OffreComponent} from "./Offre/offre.component";
import { ChatComponent } from './chat/chat.component';
import {OffrelistComponent} from "./Offre/offrelist/offrelist.component";
import {ListusersComponent} from "./listusers/listusers.component";
import { DisputeComponent } from './dispute/dispute.component';
import { OffredetailsComponent } from './Offre/offredetails/offredetails/offredetails.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClientdashboardComponent} from "./dashboard/clientdashboard/clientdashboard.component";
import {CreatordashboardComponent} from "./dashboard/creatordashboard/creatordashboard.component";
import {ProfilComponent} from "./AuthenticationCRUD/profil/profil.component";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForbiddenComponent,
    ListcreatorsComponent,
    ChangepasswordComponent,
    ForgetpassComponent,
    MdpoubliComponent,
    AdduserComponent,
    UpdateuserComponent,
    DetailsuserComponent,
    ListusersComponent,
    ListcreatorsComponent,
    HomeComponent,
    SidebarComponent,
    OffreComponent,
    ChatComponent,
    OffrelistComponent,
    DisputeComponent,
    OffredetailsComponent,
    EvaluationComponent,
    DashboardComponent,
    ClientdashboardComponent,
    CreatordashboardComponent,
    ProfilComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
