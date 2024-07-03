export class Absence {
    missingFromDate?: Date;
    missingDays?:number;

    constructor( missingFromDate: Date,missingDays:number ) {
        this.missingFromDate = missingFromDate;
        this.missingDays = missingDays;
    }

}

