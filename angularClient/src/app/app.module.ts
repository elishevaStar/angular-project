
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http"
import { StudentModule } from "./modules/students/students.module";
import { DemoModule } from "./modules/demo/demo.module";
import{Route, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.modules";
import { AbsenceComponent } from './modules/students/absence/absence.component';
import { LoginComponent } from './login/login.component';



@NgModule({
     declarations: [AppComponent, HomeComponent, PageNotFoundComponent, AbsenceComponent, LoginComponent],
     imports: [BrowserModule, ReactiveFormsModule,FormsModule,HttpClientModule,StudentModule,AppRoutingModule,DemoModule],
     bootstrap: [AppComponent]
})

export class AppModule {

}