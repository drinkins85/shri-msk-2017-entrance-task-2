module.exports = function showClassRoomsList(classRooms){

    let listHtml = '<div class="schedule-table"  >';
    for (let i=0; i<classRooms.length; i++){
        listHtml +=`<div class="schedule-table__row horisontal-line_color_gray">
                        <div class="schedule-table__col schedule-table__col_size_l " >
                            <a href="#classroom_desc_${classRooms[i].getId()}" class="schedule-table__link_type_prep" data-type="prep" data-modal="inline">${classRooms[i].getName()} </a>
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_l">
                           ${classRooms[i].getCapacity()} человек
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_xl">
                          <a class="button button_delete button_color-sheme_gray" data-action='delete' data-id="${classRooms[i].getId()}">Удалить</a>
                        </div>
                    </div>
                    <div class="hidden">
                        <div id="classroom_desc_${classRooms[i].getId()}"><div class="modal-desc">${classRooms[i].getDescription()}</div></div>
                    </div>`;
    }

    listHtml+='</div>';
    return listHtml;
};