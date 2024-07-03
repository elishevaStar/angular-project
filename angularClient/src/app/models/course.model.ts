export class Course {
    id?: number;
    subject?: string;

    constructor(subject: string) {
        this.id = 0;
        this.subject = subject;
    }
}
export const APP_COURSES: Course[] = [{ id: 1, subject: "SoftwareEngineer" }, { id: 2, subject: "Architecture" }, { id: 3, subject: "Accounting" }]
