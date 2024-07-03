import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss']
})
export class StudentShowComponent {

  constructor(private _act:ActivatedRoute,private _studentService: StudentService){}

  student?:Student
  studentId!:number
  ngOnInit(): void {
    this._act.paramMap.subscribe(param => {
      if (param.has('id')) {
        const id = param.get('id');
        if (id !== null && !isNaN(+id)) {
          this.studentId = +id;
          this.loadStudent();
        } else {
          console.error('Invalid id parameter');
        }
      }
    });
  }

  loadStudent(): void {
    this._studentService.getStudentsById(this.studentId).subscribe(student => {
      this.student = student;
    });
  }

}
