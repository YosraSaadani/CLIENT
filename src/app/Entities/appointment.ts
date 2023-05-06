export class Appointment {
  constructor(
    public _id: string,
    public dateRV: Date,
    public doctor: string,
    public patient: string,
    public heureRV: Number
  ) {}
}
