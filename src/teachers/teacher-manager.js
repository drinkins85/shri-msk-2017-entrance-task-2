const Teacher = require("./teacher");
const teachersListComponent = require("./teachers-list-component");
const teachersSelectComponent = require("./teachers-select-component");
const store = require('../store/store');
const sortObj = require('../shared/sort-obj');
const getMaxId = require('../shared/get-max-id');

module.exports = class TeacherManager {

    constructor(){
        this.teachers = [];
    };

    addTeacher(firstName, lastName, company, description){
        return new Promise((resolve, reject) => {
            if (!firstName){
                return reject(new Error("Не указано имя преподавателя"));
            }
            if (!lastName){
                return reject(new Error("Не указана фамилия преподавателя"));
            }
            let teacher = new Teacher(firstName, lastName, company, description);
            if(this.teachers.length === 0){
                teacher.setId(1);
            } else {
                teacher.setId(getMaxId(this.teachers)+1);
            }
            this.teachers.push(teacher);
            store.put("teachers", teacher.getJSON());
            return resolve();
        });
    }

    getTeachers(param = {type:"", sort:null}){

        if (param.sort){
            this.teachers.sort((ob1,ob2)=>{
                return sortObj(ob1, ob2, param.sort.field, param.sort.order)
            });
        }

        if (param.type === "html-list") {
            return teachersListComponent(this.teachers);
        }
        if (param.type === "html-select") {
            return teachersSelectComponent(this.teachers);
        }
        return this.teachers;
    }

    getTeacherById(id){
        return new Promise((resolve, reject) => {
            if (id === -1 || isNaN(id)){
                return reject(new Error("Не указан преподаватель"));
            }
            for(let i=0; i<this.teachers.length; i++){
                if(this.teachers[i].getId() === id){
                    return resolve(this.teachers[i]);
                }
            }
            return reject(new Error("Нет преподавателя с ID = "+id));
        });
    };

    deleteTeacher(id){

        return new Promise((resolve, reject)=>{
            let delete_position = -1;

            for (let i = 0; i < this.teachers.length; i++) {
                if (this.teachers[i].getId() === id) {
                    delete_position = i;
                }
            }

            if (delete_position >= 0) {
               scheduleApp.lection.getLections({filter: {teacher: id, dateStart: new Date()}})
                   .then(res =>{
                       if (!res){
                           this.teachers.splice(delete_position, 1);
                           store.delete('teachers', id);
                           return resolve();
                       }
                       return reject(new Error("У преподавателя запланированы лекции в расписании"));
                   })
                   .catch(err => {
                       console.log(err);
                       return reject(err);
                   })
            } else {
                return reject(new Error("Нет преподавателя с ID = "+id));
            }
        });
    }

    sync(){
        return new Promise((resolve, reject)=>{
            store.sync("teachers")
                .then(res=>{
                    let clr = [];
                    res.forEach(function(obj){
                        let teacher = new Teacher(obj.firstName, obj.lastName, obj.company, obj.description);
                        teacher.setId(obj._id);
                        clr.push(teacher)
                    });
                    this.teachers = clr;
                    return resolve(this.teachers);
                });
        });

    }
};



