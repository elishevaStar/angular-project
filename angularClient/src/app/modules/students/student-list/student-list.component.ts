import { Component, OnInit } from '@angular/core';
import { Gender, Student, Year } from '../student.model';
import { StudentService } from '../student.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
  //providers:[]
})
export class StudentListComponent implements OnInit {

  students!: Student[];
  totalDaysAbsence: number = 0;

  //מבקש הזרקת תלויות
  constructor(private _studentService: StudentService,private _router:Router) {
    this.from = " ";
    // _studentService.getStudentSlowly().then(studentList=>{
    //    this.students=studentList;
    // });

  }

  allDaysAbsence(id: number) {
    this.totalDaysAbsence = 0;
    if (id) {
      const s = this.students.find(x => x.id == id);
      s?.absence?.map(x => {
        this.totalDaysAbsence += x.missingDays ? x.missingDays : 0;
      })
    }
    return this.totalDaysAbsence;

  }
  // ShowStudentName(name: string) {
  //   setTimeout(()=>{
  //   if (name == "") {
  //     this._studentService.getStudentFromServer().subscribe(data => {
  //       this.students = data;
  //     },
  //       err => {
  //         alert("search faild!");
  //       });
  //   }
  //   else {
  //     this._studentService.getStudentsByName(name).subscribe(data => {
  //       this.students = data;
  //     },
  //       err => {
  //         alert("search faild!");
  //       });
  //   }
  // },1000)
  // }
  private searchTerms = new Subject<string>();

  filterBySearch(term: string): void {
    this.searchTerms.next(term);
  }

  setupSearch() {
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.trim() === '') {
          return this._studentService.getStudentFromServer();
        } else {
          return this._studentService.getStudentsByName(term);
        }
      })
    ).subscribe(data => {
      this.students = data;
    });
  }
  ngOnInit(): void {
    this.setupSearch();
    this._studentService.getStudentFromServer().subscribe(data => {
      this.students = data;
    });
  }
  
  

  gender = Gender;

  year = Year;

  //students:Student[]=this._studentService.getStudents();


  selectedStudent: any;
  add: boolean = false;
  from: string = " "

  deleteStudent(student: Student) {
    this.from = " ";
    this._studentService.deleteStudentServer(student.id).subscribe(data => {
      if (data) {
        alert("delete success!");
        let indexToDelete = this.students.indexOf(student)
        this.students.splice(indexToDelete, 1)
      }
    },
      err => {
        alert("delete faild!");
      });
  }

  updateStudent(id: number): void {
    this._router.navigate(['/studentDetails', id]).then(() => {
      this._studentService.getStudentFromServer().subscribe(data => {
        this.students = data;
      });
    });
  }
  addStudent() {
    this.from = " ";
    this.add = true;
  }

  addNewStudent() {
    this._router.navigate(["/studentDetails"])
    //this.selectedStudent = new Student("firstName", "lastName", "address", "phone", true, this.year.FirstYear, 0, this.gender.Male, new Date(Date.now()), 1)
  }

  // saveStudent(studentToSave: Student) {
  //   this.students=this._studentService.saveStudentToList(studentToSave);
    // if (studentToSave.id == 0) {
    //   studentToSave.id = this.students.length + 1;
    //   this._studentService.addStudentServer(studentToSave).subscribe(data => {
    //     this.students.push(studentToSave);
    //     alert("add success!");
    //   },
    //     err => {
    //       alert("add faild!");
    //     });
    // }
    // else {
    //   this._studentService.updateStudentServer(studentToSave, studentToSave.id).subscribe(data => {
    //     if (data) {
    //       alert("update success!");
    //       let studentToUpdate = this.students.filter(x => x.id == studentToSave.id)[0];
    //       let index = this.students.indexOf(studentToUpdate);
    //       this.students[index] = studentToSave;
    //     }
    //   },
    //     err => {
    //       alert("update faild!");
    //     });
    // }
    // this.selectedStudent = null;
  // }

  showDetails(id: number) :void{
    this._router.navigate(['/studentShow', id])
  }

  showHelp() {
    alert("Do you need help?")
  }

  ShowStudentActive(active: boolean) {
    this._studentService.getStudentsByActive(active).subscribe(data => {
      this.students = data;
    })

  }


}
