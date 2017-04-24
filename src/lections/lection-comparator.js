module.exports = function compareObjects(objFilter, objTarget){

    if (!!objFilter["teacher"]){
        if (objFilter.teacher !== objTarget.teacher.getId()){
            return false;
        }
    }

    if (!!objFilter["classRoom"]){
        if (objFilter.classRoom !== objTarget.classRoom.getId()){
            return false;
        }
    }


    if (Array.isArray(objFilter["schools"])){
        if (!objFilter.schools.some(function(number){
                for (let i=0; i<objTarget.schools.length; i++){
                    if (objTarget.schools[i].getId() === number){
                        return true;
                    }
                }
                return false;
            })){
            return false;
        }
    }

    if (!!objFilter["dateStart"] && !! objFilter["dateFinish"]){

        if ( ( objTarget.dateFinish <= objFilter.dateStart) || (objTarget.dateStart >= objFilter.dateFinish)){
            return false;
        }
    }  else {
        if (!!objFilter["dateStart"]) {
            if (objTarget["dateFinish"] <= objFilter["dateStart"]) {
                return false;
            }
        }
        if (!!objFilter["dateFinish"]) {
            if (objTarget["dateStart"] >= objFilter["dateFinish"]) {
                return false;
            }
        }
    }

    return true;
};