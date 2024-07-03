import { Component, OnInit } from '@angular/core';
import { Absence } from '../../../models/absence.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {
  students!: Student[];
  studentsWithAbsences: { name: string, absences: Absence[] | null }[] = [];

  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this._studentService.getStudentFromServer().subscribe(data => {
      this.students = data;
      this.studentsWithAbsences = this.students.map(student => ({
        name: `${student.firstName} ${student.lastName}`,
        absences: student.absence && student.absence.length > 0 ? student.absence : null
      }));
    });
  }
}
