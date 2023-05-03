export class Person {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected birthDate: Date,
    protected gender: string,
    protected role: string,
    protected email: string,
    protected password: string
  ) {}
}
