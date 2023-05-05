import { Person } from './person';

export class Doctor extends Person {
  constructor(
    public _id:string,
    public person:Person,
    public rating: number,
    public specialty: string,
    public location:string
  ) {
    super(person.firstName, person.lastName, person.birthDate, person.gender, person.role, person.email, person.password);
    this.location = location;
    this.rating = rating;
    this.specialty = specialty;
  }
}
