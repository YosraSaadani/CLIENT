export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public image: string | any,
    public gender: string,
    public role: string,
    public email: string,
    public password: string
  ) {}
}
