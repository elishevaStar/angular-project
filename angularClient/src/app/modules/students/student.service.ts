import { Injectable } from "@angular/core";
import { Student, Year, Gender } from "./student.model";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, tap,from ,filter,map} from "rxjs";
import { concatMap } from 'rxjs/operators';

const STUDENTS = [{
    id: 1, firstName: "elisheva", lastName: "katzinelbogen", address: "Sorotzkin 4"
    , phone: "0504153454", active: true, year: Year.SecondYear, avgMark: 98, gender: Gender.Male, courseId: 1,absence:[{ missingFromDate: new Date('2024-05-01'), missingDays: 2}]
}, {
    id: 2, firstName: "michal", lastName: "mazoz"
    , address: "BarIlan 30", phone: "0504107969", active: false, year: Year.ThirdYear, avgMark: 97, gender: Gender.Female, date: new Date('2024-03-13'), courseId: 2,absence:[{ missingFromDate: new Date('2024-05-02'), missingDays: 3 }]
}];
@Injectable()//אפשר להזריק מחלקה זו
export class StudentService {
    apiUrl: string = "/api/Students";
    constructor(private _http:HttpClient){

    }

    getStudentFromServer():Observable<Student[]>{
        return this._http.get<Student[]>(this.apiUrl)
    }

    getStudentsByActive(active:boolean):Observable<Student[]>{
        return this._http.get<Student[]>(`${this.apiUrl}/filterByActive/${active}`);
    }
    getStudentsByName(name:string):Observable<Student[]>{
        return this._http.get<Student[]>(`${this.apiUrl}/filterByName/${name}`);
    }
    getStudentsById(id:number):Observable<Student>{
        return this._http.get<Student>(`${this.apiUrl}/${id}`);
    }
    addStudentServer(studentToAdd:Student):Observable<boolean>{
        return  this._http.post<boolean>(this.apiUrl,studentToAdd)
    }

    updateStudentServer(studentToUpdate:Student,id:number):Observable<boolean>{
        return this._http.put<boolean>(`${this.apiUrl}/${id}`,studentToUpdate)
    }
    deleteStudentServer(id:Number):Observable<boolean>{
        return this._http.delete<boolean>(`${this.apiUrl}/${id}`)
    }
    getStudents(): Student[] {
       return STUDENTS;
    }

    getStudentSlowly(): Promise<Student[]> {
        return new Promise((res, rej) => {
            setTimeout(()=>{
             res(STUDENTS);
            },5000)
        })
    }
    length!:number
    saveStudentToList(studentToSave: Student): Observable<any> {
        return this.getStudentFromServer().pipe(
          concatMap(data => {
            this.length = data.length + 1;
            if (studentToSave.id == 0) {
              studentToSave.id = this.length + 1;
              return this.addStudentServer(studentToSave).pipe(
                tap(() => alert("add success!")),
                catchError(err => {
                  alert("add failed!");
                  throw err;
                })
              );
            } else {
              return this.updateStudentServer(studentToSave, studentToSave.id).pipe(
                tap(data => {
                  if (data) {
                    alert("update success!");
                  }
                }),
                catchError(err => {
                  alert("update failed!");
                  throw err;
                })
              );
            }
          })
        );
      }
      

      sendEmailToActiveStudents(message: string): Observable<string> {
        return this.getStudentsByActive(true).pipe(
            concatMap((students: Student[]) => from(students)),
            concatMap((student: Student) => {
                const emailAddress = `${student.firstName}@a.com`;
                // מימוש שליחת המייל בפועל
                console.log(`Sending email to ${student.firstName} at ${emailAddress}: ${message}`);
                // זריקת הודעה עבור כל שליחה מוצלחת
                return new Observable<string>(observer => {
                    // סימולציה של שליחת מייל - להחליף במימוש אמיתי
                    setTimeout(() => {
                        observer.next(`המייל נשלח בהצלחה לכתובת ${emailAddress}`);
                        observer.complete();
                    }, 1000); // סימולציה של השהייה של 1 שנייה
                });
            })
        );
    }

    sendEmailToActiveStudents2(message: string): Observable<string> {
      return this.getStudentFromServer().pipe(
          concatMap((students: Student[]) => from(students)), // יוצר Observable מכל אחד מהסטודנטים
          filter((student: Student) => student.active), // מסנן את הסטודנטים הפעילים
          map((student: Student) => {
              const emailAddress = `${student.firstName}@a.com`;
              console.log(`Sending email to ${student.firstName} at ${emailAddress}: ${message}`);
              // מימוש שליחת המייל בפועל
              return `המייל נשלח בהצלחה לכתובת ${emailAddress}`;
          })
      );
  }
}