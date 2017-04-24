module.exports = class Teacher {
    constructor(firstName, lastName, company, description){
        this._id = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.description = description || "";
    }

    getId(){
        return this._id;
    }

    getName(){
        return this.firstName+" "+this.lastName;
    }

    getCompany(){
        return this.company;
    }

    getDescription(){
        return this.description;
    }

    setId(id){
        this._id = id;
    }

    getJSON(){
        return JSON.stringify(this);
    }
};