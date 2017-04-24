module.exports = function showSchoolSelect(schools){
    let listHtml = '<select name="schools" multiple >';
    for (let i=0; i<schools.length; i++){
        listHtml += "<option value='"+schools[i].getId()+"'>"+schools[i].getName()+"</option>";
    }
    return listHtml+"</select>";
};