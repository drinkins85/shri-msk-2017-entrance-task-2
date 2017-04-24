
const Lection = require("./lection");
const Teacher = require('../teachers/teacher');
const ClassRoom = require('../classrooms/classroom');
const School = require('../schools/school');
const compareObjects = require("./lection-comparator");
const lectionsListComponent = require("./lections-list-component");
const store = require('../store/store');
const sortObj = require('../shared/sort-obj');
const getMaxId = require('../shared/get-max-id');

module.exports = class LectionManager {

    constructor(){
        this.lections = [];
    };

    addLection(name, dateStart, dateFinish, teacher, classRoom, schools){
        return new Promise((resolve, reject) => {
            if (!name){
                return reject(new Error("Не указана тема лекции"));
            }
            if (isNaN(dateStart.valueOf())){
                return reject(new Error("Не указана дата/время начала лекции"));
            }
            if (isNaN(dateFinish.valueOf())){
                return reject(new Error("Не указано время окончания лекции"));
            }
            if(schools.length === 0){
                return reject(new Error("Не указаны школы"));
            }
            if (!teacher){
                return reject(new Error("Не указан преподаватель"));
            }
            if (!classRoom){
                return reject(new Error("Не указана аудитория-"));
            }
            let lection = new Lection(name, dateStart, dateFinish, teacher, classRoom, schools);
            if(this.lections.length === 0){
                lection.setId(1);
            } else {
                lection.setId(getMaxId(this.lections)+1);
            }

            let check = [];
            check.push(this.getLections({filter:{classRoom : lection.getClassRoom().getId(), dateStart: lection.dateStart, dateFinish: lection.dateFinish}}));
            check.push(this.getLections({filter:{teacher : lection.getTeacher().getId(), dateStart: lection.dateStart, dateFinish: lection.dateFinish}}));

            let schools_capacity=0;
            let schPromises = [];
            for (let i=0; i<lection.schools.length; i++){
                check.push(this.getLections({filter: {schools : [lection.getSchools()[i].getId()], dateStart: lection.dateStart, dateFinish: lection.dateFinish}}));
                schools_capacity = schools_capacity+lection.getSchools()[i].getCount();
                if (schools_capacity > lection.classRoom.getCapacity()){
                    return reject(new Error("Данная аудитория не позволяет разместить такое количество студентов"));
                }
            }

            Promise.all(check)
                .then(res=>{
                    for (let i=0; i<res.length; i++){
                        if (res[i]){
                            if (i===0){
                                return reject(new Error("В этой аудитории уже есть лекции в это время"));
                            }
                            if (i===1){
                                return reject(new Error("У этого преподавателя уже есть лекции в это время"));
                            }
                            return reject(new Error("В расписании уже есть лекции для "+lection.getSchools()[i-2].getName()+" в это время"));
                        }
                    }
                    this.lections.push(lection);
                    store.put("lections", lection.getJSON());
                    return resolve(lection.getName());
                })
        });
    }

    getLections(param = {type : "", filter : null, sort : null}){
        return new Promise((resolve, reject)=>{

            if (!param.filter){
                if (param.sort){
                    this.lections.sort((ob1,ob2)=>{
                        return sortObj(ob1, ob2, param.sort.field, param.sort.order)
                    });
                }
                if (param.type === "html-list") {
                    return resolve(lectionsListComponent(this.lections));
                }
                return resolve(this.lections);
            }

            if ((!!param.filter.classRoom) && (typeof param.filter.classRoom !== 'number')){
                return reject(new Error("Недопустимый тип фильтра ClassRoom. Укажите id (число)."));
            }
            if ((!!param.filter.teacher) && (typeof param.filter.teacher !== 'number')){
                return reject(new Error("Недопустимый тип фильтра teacher. Укажите id (число)."));
            }
            if (!!param.filter.schools){
                if (!Array.isArray(param.filter.schools)){
                    return reject(new Error("Недопустимый тип фильтра schools. Требуется массив."));
                }
                if (!param.filter.schools.length){
                    return reject(new Error("Передан пустой массив schools."));
                }
                if (!param.filter.schools.every(val => {return typeof val === 'number'})){
                    return reject(new Error("Недопустимый тип значений массива schools."));
                }
            }
            if(!!param.filter.dateStart){
                if(typeof param.filter.dateStart === "string"){
                    if(!/^\d{4}-([0-1][0-2]|0[0-9]|[0-9])-([0-9]|[0-2][0-9]|3[0-1])$/.test(param.filter.dateStart)){
                        console.log("DS=", typeof param.filter.dateStart);
                        return reject(new Error("Недопустимый формат dateStart. Укажите дату в формате YYYY-MM-DD"));
                    }
                    param.filter.dateStart = new Date(param.filter.dateStart);
                }
                if ({}.toString.call(param.filter.dateStart) !== "[object Date]"){
                    return reject(new Error("Недопустимый формат dateStart. Укажите строку 'YYYY-MM-DD' или object Date "));
                }
            }

            if(!!param.filter.dateFinish){
                if(typeof param.filter.dateFinish === "string"){
                    if(!/^\d{4}-([0-1][0-2]|0[0-9]|[0-9])-([0-9]|[0-2][0-9]|3[0-1])$/.test(param.filter.dateFinish)){
                        return reject(new Error("Недопустимый формат dateFinish. Укажите дату в формате YYYY-MM-DD"));
                    }
                    param.filter.dateFinish = new Date(param.filter.dateFinish);
                }
                if ({}.toString.call(param.filter.dateFinish) !== "[object Date]"){
                    return reject(new Error("Недопустимый формат dateStart. Укажите строку 'YYYY-MM-DD' или object Date "));
                }
            }

            let result = [];

            for (let i=0; i<this.lections.length; i++){
                if (compareObjects({dateStart: param.filter.dateStart, dateFinish: param.filter.dateFinish, classRoom: param.filter.classRoom, teacher: param.filter.teacher, schools: param.filter.schools}, this.lections[i])){
                    result.push(this.lections[i]);
                }
            }

            if (!result.length){
                //Ничего не найдено
                return resolve(false);
            }

            console.log("res = ", result);

            if (param.type === "html-list") {
                return resolve(lectionsListComponent(result));
            }
            return resolve(result);
        });
    }

    getLectionById(id){
        return new Promise((resolve, reject) => {
            if (id === -1 || isNaN(id)){
                return reject(new Error("Не указана лекция"));
            }
            for(let i=0; i<this.teachers.length; i++){
                if(this.lections[i].getId() === id){
                    return resolve(this.lections[i]);
                }
            }
            return reject(new Error("Нет лекции с ID = "+id));
        });
    };

    deleteLection(id){
        return new Promise((resolve, reject) => {
            let delete_position = -1;
            for (let i = 0; i < this.lections.length; i++) {
                if (this.lections[i].getId() === id) {
                    delete_position = i;
                }
            }
            if (delete_position >= 0) {
                this.lections.splice(delete_position, 1);
                store.delete('lections', id);
                return resolve();
            } else {
                return reject(new Error("Нет лекции с указанным ID"));
            }
        });


    }

    sync(){
        return new Promise((resolve, reject)=>{
            store.sync("lections")
                .then(res=>{
                    let clr = [];
                    res.forEach(function(obj){
                        let teacher = new Teacher(obj.teacher.firstName, obj.teacher.lastName, obj.teacher.company, obj.teacher.description);
                        teacher.setId(obj.teacher._id);
                        let classroom = new ClassRoom (obj.classRoom.name, obj.classRoom.capacity, obj.classRoom.description);
                        classroom.setId(obj.classRoom._id);
                        let schools = [];
                        obj.schools.forEach(function(obSchool){
                            let school = new School(obSchool.name, obSchool.count);
                            school.setId(obSchool._id);
                            schools.push(school);
                        });
                        let lection = new Lection(obj.name, obj.dateStart, obj.dateFinish, teacher, classroom, schools);
                        lection.setId(obj._id);
                        clr.push(lection)
                    });
                    this.lections = clr;
                    return resolve(this.lections);
                });
        });

    }

};



