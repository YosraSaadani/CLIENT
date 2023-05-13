import { Patient } from "./patient";
import { Person } from "./person";

export class Comment {

    constructor(
        public doctor: string,
      public date: Date,
    
        public text:string,
        public rating: number,
        public patient: Person)
       {
     
       }
}
