 class Doctor extends Person {

    constructor(_id:string, firstName:string,  lastName:string, birthDate:Date, gender:string, role:string,  email:string, password:string,private location:string,private rating:number,private specialty:string,
        private person:Person){
        super(_id,firstName, lastName, birthDate, gender,role, email, password);
        this.location = location;
        this.rating = rating;
        this.specialty=specialty;
        this.person = person;

        }
}
 