export class Appointment {
  constructor(
    public _id: string,
    public dateRV: Date,
    public doctor: string,
    public Patient: string,
    public heureRV: Number
  ) {}
}
