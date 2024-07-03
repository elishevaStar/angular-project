import { Absence } from "../../models/absence.model";

export class Student {
    id: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    active: boolean;
    year?:Year;
    avgMark?: number;
    gender?: Gender;
    date?: Date;
    courseId?:number;
    absence?:Absence[]

    constructor(firstName: string, lastName: string, address: string, phone: string, active: boolean,year:Year, avgMark: number,gender:Gender, date: Date,courseId:number) {
        this.id = 0;
        this.firstName= firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.year=year;
        this.active = active;
        this.avgMark = avgMark;
        this.gender=gender;
        this.date = date;
        this.courseId=courseId;
        this.absence=[];
    }
}
export enum Gender {
    Male,
    Female
}
export enum Year {
    FirstYear,
    SecondYear,
    ThirdYear
}
