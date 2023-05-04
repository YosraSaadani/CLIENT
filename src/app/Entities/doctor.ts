import { Person } from './person';

export class Doctor extends Person {
  constructor(
    firstName: string,
    lastName: string,
    birthDate: Date,
    gender: string,
    role: string,
    email: string,
    password: string,
    public location: string,
    public rating: number,
    public specialty: string
  ) {
    super(firstName, lastName, birthDate, gender, role, email, password);
    this.location = location;
    this.rating = rating;
    this.specialty = specialty;
  }
}
