module.exports = class ClassRoom {

    constructor(name, capacity, description) {
        this._id = 0;
        this.name = name;
        this.capacity = capacity;
        this.description = description || "";
    };

    getId(){
        return this._id;
    }

    getName() {
        return this.name;
    };

    getCapacity() {
        return this.capacity;
    };

    getDescription() {
        return this.description;
    };

    setId(id){
        this._id = id;
    }

    getJSON(){
        return JSON.stringify(this);
    }

};