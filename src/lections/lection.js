module.exports = class Lection {
    constructor(name, dateStart, dateFinish, teacher, classRoom, schools){
        this._id = 0;
        this.name = name;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.teacher = teacher;
        this.classRoom = classRoom;
        this.schools = schools;
    }

    getId(){
        return this._id;
    }

    getName(){
        return this.name;
    }

    getDateStart(){
        return this.dateStart;
    }

    getDateFinish(){
        return this.dateFinish;
    }

    getTeacher(){
        return this.teacher;
    }

    getClassRoom(){
        return this.classRoom;
    }

    getSchools(){
        return this.schools;
    }

    setId(id){
        this._id = id;
    }

    getJSON(){
        return JSON.stringify(this);
    }

};