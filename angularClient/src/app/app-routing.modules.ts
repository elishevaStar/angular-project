import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StudentListComponent } from "./modules/students/student-list/student-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AbsenceComponent } from "./modules/students/absence/absence.component";
import { StudentDeatailsFormMDComponent } from "./modules/students/student-deatails-form-md/student-deatails-form-md.component";
import { LoginService } from "./login/login.service";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./auth-guard.service";
import { StudentShowComponent } from "./modules/students/student-show/student-show.component";

const App_Routes:Route[]=[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"students",component:StudentListComponent},
    {path:"absence",component:AbsenceComponent},
    { path: 'studentDetails/:id', component: StudentDeatailsFormMDComponent},
    { path: 'studentDetails', component: StudentDeatailsFormMDComponent},
    { path: 'studentShow/:id', component: StudentShowComponent},
    //lazylouding
    { path: 'setting', loadChildren:()=>import("./modules/setting/setting.module").then(x=>x.SettingModule),canActivate:[AuthGuardService]},
    { path: 'demo', loadChildren:()=>import("./modules/demo/demo.module").then(x=>x.DemoModule)},
    {path:"login",component:LoginComponent},
    {path:"**",component:PageNotFoundComponent}//חיב להיות בסוף אחרת כל ניווט יוביל לפה
]
@NgModule({
    imports:[RouterModule.forRoot(App_Routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}