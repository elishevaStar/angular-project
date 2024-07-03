import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrls: ['./directive-demo.component.scss']
})
export class DirectiveDemoComponent {
  x: string = "a";
  students: string[] = ["student1", "student2", "student3"];
  isActive: boolean = true;
  id: number = 1;
}
