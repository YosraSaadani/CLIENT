import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class Consultation {
    constructor(public doctorId:Doctor,
        public patientId:Patient,
        public vmarks:string,
       public medicine:string) { }
}
