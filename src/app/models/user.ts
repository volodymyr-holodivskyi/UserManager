export class User{
    name:string;
    email:string;
    password:string;
    created_at:string;
    updated_at:string;
    id:number;
    constructor(name:string,email:string,password:string,created_at:string,updated_at:string,id:number){
        this.name=name;
        this.email=email;
        this.password=password;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.id=id;
    }
}