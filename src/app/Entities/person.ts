export class Person {
  constructor(
    public _id:string,
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public image:string,
    public gender: string,
    public role: string,
    public email: string,
    public password: string
  ) {}
}
