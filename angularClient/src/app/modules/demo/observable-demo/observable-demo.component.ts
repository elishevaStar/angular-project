import { Component } from '@angular/core';
import { Observable, from, interval } from 'rxjs';
import { StudentService } from '../../students/student.service';
import { Gender, Student, Year } from '../../students/student.model';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-observable-demo',
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.scss']
})
export class ObservableDemoComponent {
  students:Student[]=this._studentService.getStudents();
  emailMessages: string[] = [];

  //   source: Observable<number>=new Observable((observer)=>{
  //     observer.next(1);
  //     observer.next(2);
  //     setTimeout(()=>{
  //       observer.next(3);
  //     },3000)

  //     //observer.complete();
  //     observer.error("error")
  // })
  
  timer: Observable<string>=new Observable(obs=>{
     setInterval(()=>{
        obs.next(new Date().toLocaleTimeString())
     },1000)
  }) 

  timerValue?:string
  timerByOperator:Observable<string>=interval(1000).pipe(map(x=>{return new Date().toLocaleTimeString()}))
  source2:Observable<string | undefined>=from(this.students).pipe(map(x=>{return x.firstName}))
  source: Observable<Student>=new Observable((observer)=>{
    this.students.forEach(s => {
      observer.next(s);
    });
    //observer.complete();
    //observer.error("error")
})
//x?:number;
name!:string
constructor(private _studentService: StudentService){
  this.source2.subscribe(
    //next
    (val)=>{
      this.name=val?val:"no students";
      console.log(val);
   },
   //error
   (err)=>{
     console.log(err);
   },
   //complete
   ()=>{
    console.log("completed");
   });
    // this.source.subscribe(
    //       //next
    //       (val)=>{
    //         console.log(val.firstName);
    //      },
    //      //error
    //      (err)=>{
    //        console.log(err);
    //      },
    //      //complete
    //      ()=>{
    //       console.log("completed");
    //      });

    //  this.source.pipe(map(x=>{return x*3}), filter(x=>{return x%2==0;})).subscribe(
    //   //next
    //   (val)=>{
    //     console.log(val);
    //  },
    //  //error
    //  (err)=>{
    //    console.log(err);
    //  },
    //  //complete
    //  ()=>{
    //   console.log("completed");
    //  });

     this.timerByOperator.subscribe((val)=>{
      this.timerValue=val;
     });
  }
  sendEmailsToActiveStudents() {
    const message = "This is a test email";
    this._studentService.sendEmailToActiveStudents2(message).subscribe(emailMessage => {
      this.emailMessages.push(emailMessage);
    });
  }
}
