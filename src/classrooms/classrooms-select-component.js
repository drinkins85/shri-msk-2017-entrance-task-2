module.exports = function showClassRoomsSelect(classRooms){
    let listHtml = '<select name="classrooms"><option value="-1">Аудитория</option>';
    for (let i=0; i<classRooms.length; i++){
        listHtml += "<option value='"+classRooms[i].getId()+"'>"+classRooms[i].getName()+"</option>";
    }
    return listHtml+"</select>";
};