import { Person } from "./person";

export class Patient extends Person  
{
    constructor(
        public _id:string,
        public person:Person,
        public allergies: number[],
        public bloodTtype: string,
        public height:number,
        public weight:number,
    )
    {
        super(person.firstName, person.lastName, person.birthDate,person.image, person.gender, person.role, person.email, person.password);
        this.allergies = allergies;
        this.bloodTtype = bloodTtype;
        this.height = height;
        this.weight=weight;
    }
}
