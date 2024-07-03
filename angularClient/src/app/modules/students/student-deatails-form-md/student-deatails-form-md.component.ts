import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gender, Student, Year } from '../student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_COURSES, Course } from '../../../models/course.model';
import { Absence } from '../../../models/absence.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-deatails-form-md',
  templateUrl: './student-deatails-form-md.component.html',
  styleUrls: ['./student-deatails-form-md.component.scss']
})
export class StudentDeatailsFormMDComponent implements OnInit{
  courseList: Course[]=APP_COURSES;

  // private _student!: Student

  gender=Gender;

  year=Year;

  constructor(private _act:ActivatedRoute,private _studentService: StudentService,private _router:Router){

  }
  student!:Student
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
      } else {
        this.student = new Student("firstName", "lastName", "address", "0000000000", true, this.year.FirstYear, 0, this.gender.Male, new Date(Date.now()), 1);
        this.student.id = 0;
        this.updateForm();
      }
    });
  }
  
  loadStudent(): void {
    this._studentService.getStudentsById(this.studentId).subscribe(student => {
      this.student = student;
      this.updateForm();
    });
  }
  
  updateForm(): void {
    this.studentForm = new FormGroup({
      id: new FormControl(this.student.id),
      firstName: new FormControl(this.student.firstName, Validators.required),
      lastName: new FormControl(this.student.lastName, Validators.required),
      address: new FormControl(this.student.address, [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(this.student.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
      active: new FormControl(this.student.active, Validators.required),
      courseId: new FormControl(this.student.courseId, Validators.required),
      year: new FormControl(this.student.year, Validators.required),
      avgMark: new FormControl(this.student.avgMark, [Validators.required, Validators.max(100)]),
      gender: new FormControl(this.student.gender, Validators.required),
      date: new FormControl(this.student.date),
    });
  }
  
  


  // public get student(): Student {
  //   return this._student;
  // }
  // public get absence(): Absence {
  //   return this._student?.absence ? this._student.absence[0] : { missingFromDays: undefined, missingDays: 0 };
  // }


  missingFromDate?:Date;
  missingDays:number=0;

  totalMissingDays: number=0;

  // @Input()
  // from!:string;

  // @Input()
  // public set student(value: Student) {
  //   this._student = value
  //   if (this.student != undefined) {
  //     this.studentForm = new FormGroup({
  //       "id": new FormControl(this.student.id),
  //       "firstName": new FormControl(this.student.firstName, Validators.required),
  //       "lastName": new FormControl(this.student.lastName, Validators.required),
  //       "address": new FormControl(this.student.address, [Validators.required, Validators.minLength(3)]),
  //       "phone": new FormControl(this.student.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
  //       "active": new FormControl(this.student.active, Validators.required),
  //       "courseId":new FormControl(this.student.courseId,Validators.required),
  //       "year": new FormControl(this.student.year),
  //       "avgMark": new FormControl(this.student.avgMark, [Validators.required, Validators.max(100)]),
  //       "gender": new FormControl(this.student.gender),
  //       "date": new FormControl(this.student.date),
  //     })
  //   }

  // }

  @Output()
  onSaveStudent: EventEmitter<Student> = new EventEmitter();

  @Output()
  onFirstFocus: EventEmitter<any> = new EventEmitter();

  studentForm: FormGroup = new FormGroup({});

  firstFocusEmitted: boolean = false
  saveNewStudent(): void {
    const updateStudent = {...this.studentForm.value};
    if (!updateStudent.absence) {
      updateStudent.absence = [];
    }
    if (this.student && this.student.absence && this.student.absence.length > 0) {
      updateStudent.absence = [...this.student.absence];
    }
    if (this.missingFromDate && this.missingDays > 0) {
      updateStudent.absence.push({missingFromDate: this.missingFromDate, missingDays: this.missingDays});
    }
  
    this._studentService.saveStudentToList(updateStudent).subscribe(() => {
      this._router.navigate(['/students']);
    });
  }
  
  // saveNewStudent() {
  //   const updateStudent={...this.studentForm.value};
  //   if (!updateStudent.absence) {
  //     updateStudent.absence = [];
  //   }
  //   if (this.student && this.student.absence && this.student.absence.length > 0) {
  //     updateStudent.absence = [...this.student.absence];
  //   }
  //   if(this.missingFromDate && this.missingDays>0)
  //     updateStudent.absence.push({missingFromDate:this.missingFromDate,missingDays:this.missingDays})
  //   // this.onSaveStudent.emit(updateStudent);
  //   this._studentService.saveStudentToList(updateStudent);
  //   this._router.navigate(["/students"])
  // }

  // inputFocus() {
  //   if (!this.firstFocusEmitted) {
  //     this.onFirstFocus.emit();
  //     this.firstFocusEmitted = true;
  //   }
  // }
}
