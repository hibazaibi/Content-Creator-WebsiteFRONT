

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
import {ListusersComponent} from "./AuthenticationCRUD/listusers/listusers.component";
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





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForbiddenComponent,
    ListusersComponent,
    ChangepasswordComponent,
    ForgetpassComponent,
    MdpoubliComponent,
    AdduserComponent,
    UpdateuserComponent,
    DetailsuserComponent,
    HomeComponent,
    SidebarComponent,
    OffreComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
