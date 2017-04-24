module.exports = function showTeachersList(teachers){
    let listHtml = '<div class="schedule-table"  >';
    for (let i=0; i<teachers.length; i++){
        listHtml +=`<div class="schedule-table__row horisontal-line_color_gray">
                        <div class="schedule-table__col schedule-table__col_size_xl " >
                            <a href="#teacher_desc_${teachers[i].getId()}" class="schedule-table__link_type_prep" data-type="prep" data-modal="inline">${teachers[i].getName()} </a>
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_l">
                           ${teachers[i].getCompany()}
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_l">
                          <a class="button button_delete button_color-sheme_gray" data-action='delete' data-id="${teachers[i].getId()}">Удалить</a>
                        </div>
                    </div>
                    <div class="hidden">
                        <div id="teacher_desc_${teachers[i].getId()}" ><div class="modal-desc">${teachers[i].getDescription()}</div></div>
                    </div>`;
    }

    listHtml+='</div>';

    return listHtml;
};