
const ClassRoom = require("./classroom");
const classRoomsListComponent = require("./classrooms-list-component");
const classRoomsSelectComponent = require("./classrooms-select-component");
const store = require('../store/store');
const sortObj = require('../shared/sort-obj');
const getMaxId = require('../shared/get-max-id');


module.exports = class ClassRoomManager {
    constructor(){
        this.classrooms = [];
    }

    addClassRoom(name, capacity, description){
        return new Promise((resolve, reject) => {
            if (!name){
                return reject(new Error("Не указано название аудитории"));
            }
            if (!capacity){
                return reject(new Error("Не указана вместимость аудитории"));
            }
            let classroom = new ClassRoom(name, capacity, description);
            if(this.classrooms.length === 0){
                classroom.setId(1);
            } else {
                classroom.setId(getMaxId(this.classrooms)+1);
            }
            this.classrooms.push(classroom);
            store.put("classrooms", classroom.getJSON());
            return resolve();

        });
    }

    getClassRooms(param = {type:"", sort:null}){

        if (param.sort){
            this.classrooms.sort((ob1,ob2)=>{
                return sortObj(ob1, ob2, param.sort.field, param.sort.order)
            });
        }

        if (param.type === "html-list") {
            return classRoomsListComponent(this.classrooms);
        }
        if (param.type === "html-select"){
            return classRoomsSelectComponent(this.classrooms);
        }
        return this.classrooms;
    };

    getClassRoomById(id){
        return new Promise((resolve, reject) => {
            if (id === -1 || isNaN(id)){
                return reject(new Error("Не указана аудитория"));
            }

            for(let i=0; i<this.classrooms.length; i++){
                if(this.classrooms[i].getId() === id){
                    return resolve(this.classrooms[i]);
                }
            }
            return reject(new Error("Нет аудитории с ID = "+id));
        });
    };

    deleteClassRoom(id){
        return new Promise((resolve, reject)=>{
            let delete_position = -1;
            for (let i = 0; i < this.classrooms.length; i++) {
                if (this.classrooms[i].getId() === id) {
                    delete_position = i;
                }
            }
            if (delete_position >= 0) {
                scheduleApp.lection.getLections({filter: {classRoom: id, dateStart: new Date()}})
                    .then(res=>{
                       if(!res){
                           this.classrooms.splice(delete_position, 1);
                           store.delete('classrooms', id)
                           return resolve();
                       }
                       return reject(new Error("В этой аудитории запланированы лекции"));
                    })
                    .catch(err => {
                        return reject(err);
                    });
            } else {
                return reject(new Error("Нет аудитории с ID = "+id));
            }
        });
    }

    sync(){
        return new Promise((resolve, reject)=>{
            store.sync("classrooms")
                .then(res=>{
                    let clr = [];
                    res.forEach(function(obj){
                        let classroom = new ClassRoom(obj.name, obj.capacity, obj.description);
                        classroom.setId(obj._id);
                        clr.push(classroom)
                    });
                    this.classrooms = clr;
                    return resolve(this.classrooms);
                });
        });

    }
};