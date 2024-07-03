import { NgModule } from "@angular/core";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentDeatailsFormMDComponent } from "./student-deatails-form-md/student-deatails-form-md.component";
import { StudentService } from "./student.service";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StudentShowComponent } from "./student-show/student-show.component";


@NgModule({
    declarations:[StudentListComponent, StudentDeatailsFormMDComponent,StudentShowComponent],
    imports:[CommonModule,BrowserModule, ReactiveFormsModule,HttpClientModule,FormsModule,RouterModule],
    providers:[StudentService],
    exports:[StudentListComponent]
})
export class StudentModule{

}