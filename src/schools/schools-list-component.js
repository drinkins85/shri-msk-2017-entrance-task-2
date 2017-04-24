module.exports = function showSchoolList(schools){
    let listHtml = '<div class="schedule-table" >';
    for (let i=0; i<schools.length; i++){
        listHtml +=`<div class="schedule-table__row horisontal-line_color_gray">
                        <div class="schedule-table__col schedule-table__col_size_xl " >
                            ${schools[i].getName()}
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_l">
                            ${schools[i].getCount()} человек
                        </div>
                        <div class="schedule-table__col schedule-table__col_size_l">
                          <a class="button button_delete button_color-sheme_gray" data-action='delete' data-id="${schools[i].getId()}">Удалить</a>
                        </div>
                    </div>`;
    }
    listHtml+='</div>';
    return listHtml;
};
