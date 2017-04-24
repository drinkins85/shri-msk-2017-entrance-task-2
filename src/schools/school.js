module.exports = class School {

    constructor(name, count) {
        this._id = 0;
        this.name = name;
        this.count = count;
    };

    getId(){
        return this._id;
    }

    getName() {
        return this.name;
    };

    getCount() {
        return this.count;
    };

    setId(id){
        this._id = id;
    }

    getJSON(){
        return JSON.stringify(this);
    }

};