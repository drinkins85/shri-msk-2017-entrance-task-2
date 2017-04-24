module.exports = function showTeachersSelect(teachers){
    let listHtml = '<select name="teachers"><option value="-1">Преподаватель</option>';
    for (let i=0; i<teachers.length; i++){
        listHtml += "<option value='"+teachers[i].getId()+"'>"+teachers[i].getName()+"</option>";
    }
    return listHtml+"</select>";
};