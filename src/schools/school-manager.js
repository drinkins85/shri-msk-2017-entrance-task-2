const School = require("./school");
const schoolsListComponent = require("./schools-list-component");
const schoolsSelectComponent = require("./schools-select-component");
const store = require('../store/store');
const sortObj = require('../shared/sort-obj');
const getMaxId = require('../shared/get-max-id');


module.exports = class SchoolManager {
    constructor(){
        this.schools = [];
    };

    addSchool(name, count){
        return new Promise((resolve, reject) => {
            if (!name) {
                return reject(new Error("Не указано название школы"));
            }
            if (!count){
                return reject(new Error("Не указано количество учеников"));
            }
            let school = new School(name, count);
            if (this.schools.length === 0) {
                school.setId(1);
            } else {
                school.setId(getMaxId(this.schools)+1);
            }
            this.schools.push(school);
            store.put("schools", school.getJSON());
            return resolve();
        });
    }

    getSchools(param = {type:"", sort:null}){

        if (param.sort){
            this.schools.sort((ob1,ob2)=>{
                return sortObj(ob1, ob2, param.sort.field, param.sort.order)
            });
        }

        if (param.type === "html-list") {
            return schoolsListComponent(this.schools);
        }

        if (param.type === "html-select") {
            return schoolsSelectComponent(this.schools);
        }
        return this.schools;
    }

    getSchoolById(id){
        return new Promise((resolve, reject) => {
            if (id === -1 || isNaN(id)){
                return reject(new Error("Не указана школа"));
            }
            for(let i=0; i<this.schools.length; i++){
                if(this.schools[i].getId() === id){
                    return resolve(this.schools[i]);
                }
            }
            return reject(new Error("Нет школы с ID = "+id));
        });
    };

    deleteSchool(id){
        return new Promise((resolve, reject)=>{
            let delete_position = -1;
            for (let i = 0; i < this.schools.length; i++) {
                if (this.schools[i].getId() === id) {
                    delete_position = i;
                }
            }
            if (delete_position >= 0) {
                scheduleApp.lection.getLections({filter: {schools: [id], dateStart: new Date()}})
                    .then(res => {
                        if(!res){
                            this.schools.splice(delete_position, 1);
                            store.delete('schools', id);
                            return resolve();
                        }
                        return reject(new Error("Для этой школы запланированы лекции в расписании"));
                    })
                    .catch(err => {
                            return resolve(err)
                        }
                    );
            } else {
                return reject(new Error("Нет школы с ID = "+id));
            }
        });
    }

    sync(){
        return new Promise((resolve, reject)=>{
            store.sync("schools")
                .then(res=>{
                    let clr = [];
                    res.forEach(function(obj){
                        let school = new School(obj.name, obj.count);
                        school.setId(obj._id);
                        clr.push(school)
                    });
                    this.schools = clr;
                    return resolve(this.schools);
                });
        });
    }
};



