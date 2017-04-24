
module.exports = function showLectionsList(lections){
    let listHtml = '<div class="schedule-table" >';
    for (let i=0; i<lections.length; i++){
        listHtml +=`<div class="schedule-table__row horisontal-line_color_gray" >
                        <div class="schedule-table__col schedule-table__col-date schedule-table__col_size_m">
                        <span class="schedule-table__date">${lections[i].getDateStart().getDate()}</span> 
                        <span class="schedule-table__month" data-type="month">${lections[i].getDateStart().toLocaleString('ru', {day: "2-digit", month: 'long'}).slice(2)}</span>
                        <span class="schedule-table__year" data-type="year">${lections[i].getDateStart().getFullYear()}</span>
                        </div>
                        <div class="schedule-table__col schedule-table__col-time schedule-table__col_size_s">
                            <span class="schedule-table__time-from">${lections[i].getDateStart().toLocaleString('ru', { hour: 'numeric', minute: 'numeric'})}</span>
                            <span class="schedule-table__time-to">${lections[i].getDateFinish().toLocaleString('ru', { hour: 'numeric', minute: 'numeric'})}</span>
                        </div>
                        <div class="schedule-table__col schedule-table__col-lection schedule-table__col_size_xl " >
                            <a href="#" class="schedule-table__link_type_lection ${lections[i].getDateStart() < Date.now() ? 'link_noactive' : ''}">${lections[i].getName()}</a>`;
                            for (j=0; j<lections[i].getSchools().length; j++){
                                listHtml += `<a class="schedule-table__school schedule-table__school_triangle" data-type="school" title="${lections[i].getSchools()[j].getName()}">
                                                ${lections[i].getSchools()[j].getName()}
                                             </a>`;
                            }
        listHtml +=`    </div>
                        <div class="schedule-table__col schedule-table__col-prep schedule-table__col_size_l">
                        <a href="#teacher_desc_${lections[i].getTeacher().getId()}" class="schedule-table__link_type_prep" data-type="prep" data-modal="inline">${lections[i].getTeacher().getName()}</a>
                        <span class="schedule-table__prep-info">${lections[i].getTeacher().getCompany()}</span>
                         <span class="schedule-table__location-label">Аудитория:</span><a href="#classroom_desc_${lections[i].getClassRoom().getId()}" class="schedule-table__link_type_location" data-modal="inline">${lections[i].getClassRoom().getName()}</a>
                        <a class="button button_delete button_color-sheme_gray" data-action='delete' data-id="${lections[i].getId()}">Удалить</a>
                        </div>
                     </div>`;
    }
    listHtml+='</div>';
    return listHtml;
};

