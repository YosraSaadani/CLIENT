import { Person } from "./person";

export class Patient extends Person  
{
    constructor(
        public _id:string,
        public person:Person,
        public allergies: string[],
        public bloodType: string,
        public height:number,
        public weight:number,
        public amount:number
    )
    {
        super(person.firstName, person.lastName, person.birthDate,person.image, person.gender, person.role, person.email, person.password);
        this.allergies = allergies;
        this.bloodType = bloodType;
        this.height = height;
        this.weight = weight;
        this.amount = amount;
    }
}
