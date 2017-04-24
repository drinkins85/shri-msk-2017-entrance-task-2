
Promise.all([
    scheduleApp.classroom.sync(),
    scheduleApp.school.sync(),
    scheduleApp.teacher.sync(),
    scheduleApp.lection.sync()
])
    .then(()=>{
        showSchools("schools", {type : "html-list", sort: {field : "name", order : "asc"}});
        showSchools("school-select", {type : "html-select"});
        showTeachers("teachers", {type : "html-list", sort: {field : "firstName", order : "asc"}});
        showTeachers("teacher-select", {type : "html-select"});
        showClassrooms("classrooms", {type : "html-list", sort: {field : "name", order : "asc"}});
        showClassrooms("classroom-select", {type : "html-select"});
        showLections("lections", {type : "html-list", sort: {field : "dateStart", order : "asc"}});
    });

function showSchools(contentType, param)
{
    let listCode = scheduleApp.school.getSchools(param);
    let schoolsLists = document.querySelectorAll('[data-content='+contentType+']');
    schoolsLists.forEach((schoolsContainer) =>{
        schoolsContainer.innerHTML = listCode;
    });
    document.addEventListener('schoolsUpdate', ()=> showSchools(contentType, param));
    let delButtons = document.querySelector('[data-content='+contentType+']').querySelectorAll("[data-action=delete]");
    for (let i=0; i<delButtons.length; i++){
        delButtons[i].addEventListener('click', function() {
            let id = +this.getAttribute("data-id");
            if (confirm("Удалить школу?")){
                delSchool(id);
            }
        })
    }
}

document.querySelector("[data-action=addSchool]").addEventListener('click',()=>{
    let form = document.getElementById("schoolAddForm");
    let name = form.querySelector("input[name=school-name]").value;
    let count = form.querySelector("input[name=school-count]").value;

    scheduleApp.school.addSchool(name, count)
        .then(()=>{
            form.querySelector("input[name=school-name]").value = '';
            form.querySelector("input[name=school-count]").value = '';
            let updEvent = new CustomEvent("schoolsUpdate", {
                bubbles: true,
                cancelable: true,
                detail: "Update schools list"
            });
            document.dispatchEvent(updEvent);
            hideError();
        })
        .catch((err)=>{
            console.error(err);
            showError(err.message);
        });
    event.preventDefault();
});

function showTeachers(contentType, param){
    let listCode = scheduleApp.teacher.getTeachers(param);
    let teachersLists = document.querySelectorAll('[data-content='+contentType+']');
    teachersLists.forEach((teachersContainer) =>{
        teachersContainer.innerHTML = listCode;
    });
    document.addEventListener('teachersUpdate', ()=> showTeachers(contentType, param));
    let delButtons = document.querySelector('[data-content='+contentType+']').querySelectorAll("[data-action=delete]");
    for (let i=0; i<delButtons.length; i++){
        delButtons[i].addEventListener('click', function() {
            let id = +this.getAttribute("data-id");
            if (confirm("Удалить преподавателя?")){
                delTeacher(id);
            }
        })
    }
}

document.querySelector("button[data-action=addTeacher]").addEventListener('click',()=>{
    let form = document.getElementById("teacherAddForm");
    let firstname = form.querySelector("input[name=teacher-firstname]").value;
    let lastname = form.querySelector("input[name=teacher-lastname]").value;
    let company = form.querySelector("input[name=teacher-company]").value;
    let description = form.querySelector("textarea[name=teacher-description]").value;

    scheduleApp.teacher.addTeacher(firstname, lastname, company, description)
        .then(()=>{
            let updEvent = new CustomEvent("teachersUpdate", {bubbles : true, cancelable : true, detail : "Update teacher list"});
            document.dispatchEvent(updEvent);
            form.querySelector("input[name=teacher-firstname]").value = '';
            form.querySelector("input[name=teacher-lastname]").value = '';
            form.querySelector("input[name=teacher-company]").value = '';
            form.querySelector("textarea[name=teacher-description]").value = '';
            hideError();
        })
        .catch((err) =>{
            console.error(err);
            showError(err.message);
        });
    event.preventDefault();
});

function showClassrooms(contentType, param){
    let listCode = scheduleApp.classroom.getClassRooms(param);
    let classroomsLists = document.querySelectorAll('[data-content='+contentType+']');
    classroomsLists.forEach((classroomContainer) =>{
        classroomContainer.innerHTML = listCode;
    });
    document.addEventListener('classroomsUpdate', ()=> showClassrooms(contentType, param));
    let delButtons = document.querySelector('[data-content='+contentType+']').querySelectorAll("[data-action=delete]");
    for (let i=0; i<delButtons.length; i++){
        delButtons[i].addEventListener('click', function() {
            let id = +this.getAttribute("data-id");
            if (confirm("Удалить аудиторию?")){
                delClassroom(id);
            }
        })
    }
}

document.querySelector("button[data-action=addClassroom]").addEventListener('click',()=>{
    let form = document.getElementById("classroomAddForm");
    let name = form.querySelector("input[name=classroom-name]").value;
    let capacity = form.querySelector("input[name=classroom-capacity]").value;
    let description = form.querySelector("textarea[name=classroom-description]").value;
    scheduleApp.classroom.addClassRoom(name, capacity, description)
        .then(()=>{
            let updEvent = new CustomEvent("classroomsUpdate", {bubbles : true, cancelable : true, detail : "Update classrooms list"});
            document.dispatchEvent(updEvent);
            form.querySelector("input[name=classroom-name]").value = '';
            form.querySelector("input[name=classroom-capacity]").value = '';
            form.querySelector("textarea[name=classroom-description]").value = '';
            hideError();
        })
        .catch((err) => {
            console.error(err);
            showError(err.message);

        });
    event.preventDefault();
});

function showLections(ElementId, param){
    scheduleApp.lection.getLections(param)
        .then((code) => {
            document.getElementById(ElementId).innerHTML = code || "Ничего не найдено";
            let delButtons = document.getElementById(ElementId).querySelectorAll("[data-action=delete]");
            for (let i=0; i<delButtons.length; i++){
                delButtons[i].addEventListener('click', function() {
                    let id = +this.getAttribute("data-id");
                    if (confirm("Удалить лекцию?")){
                        delLection(id);
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

document.addEventListener('lectionsUpdate', function() {
    showLections("lections", {type : "html-list", sort: {field : "dateStart", order : "asc"}});
});

document.querySelector("button[data-action=addLection]").addEventListener('click',()=>{
    let form = document.getElementById("lectionAddForm");
    let name = form.querySelector("input[name=lection-theme]").value;
    let date = form.querySelector("input[name=lection-date]").value;
    let time_start = form.querySelector("input[name=lection-start]").value;
    let time_finish = form.querySelector("input[name=lection-finish]").value;
    let classRoom_select = form.querySelector("select[name=classrooms]").value;
    let teacher_select = form.querySelector("select[name=teachers]").value;
    let schools_select = form.querySelector("select[name=schools]").selectedOptions;
    let schools_value = [];
    let dateStart = new Date(Date.parse(date+"T"+time_start+":00.000+03:00"));
    let dateFinish = new Date(Date.parse(date+"T"+time_finish+":00.000+03:00"));
    let schools_promises = [];

    for (i=0; i<schools_select.length; i++){
        schools_promises.push(scheduleApp.school.getSchoolById(+schools_select[i].value));
    }
    Promise.all(schools_promises)
        .then(schools_arr => {
            schools_value = schools_arr;
        });

    Promise.all([
        scheduleApp.classroom.getClassRoomById(+classRoom_select),
        scheduleApp.teacher.getTeacherById(+teacher_select),
    ])
        .then(values => {
            let classRoom = values[0];
            let teacher = values[1];
            scheduleApp.lection.addLection(name, dateStart, dateFinish, teacher, classRoom, schools_value)
                .then((res)=> {
                    let updEvent = new CustomEvent("lectionsUpdate", {
                        bubbles: true,
                        cancelable: true,
                        detail: "Update lections list"
                    });
                    document.dispatchEvent(updEvent);
                    hideError();
                    form.querySelector("input[name=lection-theme]").value = '';
                    form.querySelector("input[name=lection-date]").value = '';
                    form.querySelector("input[name=lection-start]").value = '';
                    form.querySelector("input[name=lection-finish]").value = '';
                    form.querySelector("select[name=classrooms]").selectedIndex = 0;
                    form.querySelector("select[name=teachers]").selectedIndex = 0;
                    form.querySelector("select[name=schools]").selectedIndex = -1;
                })
                .catch((err) => {
                    console.error(err);
                    showError(err.message);
                });
        })
        .catch((err) => {
            console.error(err);
            showError(err.message);
        });
    event.preventDefault();
});

function delLection(id){
    scheduleApp.lection.deleteLection(id)
        .then(()=> {
            let updEvent = new CustomEvent("lectionsUpdate", {
                bubbles: true,
                cancelable: true,
                detail: "Update lections list"
            });
            document.dispatchEvent(updEvent);
            hideError();
        })
        .catch((err)=>{
            console.error(err);
            showError(err.message);
        })
}

function delTeacher(id){
    scheduleApp.teacher.deleteTeacher(id)
        .then(()=> {
            let updEvent = new CustomEvent("teachersUpdate", {
                bubbles: true,
                cancelable: true,
                detail: "Update teachers list"
            });
            document.dispatchEvent(updEvent);
            hideError();
        })
        .catch((err)=>{
            console.error(err);
            showError(err.message);
        })
}

function delClassroom(id){
    scheduleApp.classroom.deleteClassRoom(id)
        .then(()=> {
            let updEvent = new CustomEvent("classroomsUpdate", {
                bubbles: true,
                cancelable: true,
                detail: "Update classrooms list"
            });
            document.dispatchEvent(updEvent);
            hideError();
        })
        .catch((err)=>{
            console.error(err);
            showError(err.message);
        });
}

function delSchool(id){
    scheduleApp.school.deleteSchool(id)
        .then(()=> {
            let updEvent = new CustomEvent("schoolsUpdate", {
                bubbles: true,
                cancelable: true,
                detail: "Update schools list"
            });
            document.dispatchEvent(updEvent);
            hideError();
        })
        .catch((err)=>{
            console.error(err);
            showError(err.message);
        })
}

function showError(err) {
    let errorBlock = document.getElementById("error-block");
    errorBlock.querySelector(".error-block__message").innerHTML = err;
    errorBlock.classList.add("error-block_visible");
}

function hideError() {
    document.getElementById("error-block").classList.remove("error-block_visible");
}

function filter(){
    let filtedBlock = document.getElementById('filter');
    let teacher_select = filtedBlock.querySelector("select[name=teachers]").value;
    let classroom_select = filtedBlock.querySelector("select[name=classrooms]").value;
    let schools_select = filtedBlock.querySelector("select[name=schools]").selectedOptions.valueOf();
    let dateFrom = filtedBlock.querySelector("input[name=lection-date-from]").value;
    let dateTo = filtedBlock.querySelector("input[name=lection-date-to]").value;
    let filterParams = {};
    if (classroom_select >= 0) {
        filterParams.classRoom = +classroom_select;
    }
    if (teacher_select >= 0) {
        filterParams.teacher = +teacher_select;
    }
    if(schools_select.length>0){
        filterParams.schools = [];
        for (i=0; i<schools_select.length; i++){
            filterParams.schools.push(+schools_select[i].value);
        }
    }
    if (dateFrom !== ''){
        filterParams.dateStart = dateFrom;
    }
    if (dateTo !== ''){
        filterParams.dateFinish = dateTo;
    }
    showLections("lections", {type : "html-list", filter : filterParams});
    filtedBlock.querySelector("button[name=reset]").classList.remove("hidden");
}

function resetFilter(){
    let inp  = document.getElementById('filter').querySelectorAll("input");
    for (let i=0; i<inp.length; i++){
        inp[i].value = '';
    }
    let slc  = document.getElementById('filter').querySelectorAll("select");
    for (let i=0; i<slc.length; i++){
        if (slc[i].hasAttribute('multiple')){
            slc[i].selectedIndex = -1;
        } else {
            slc[i].selectedIndex = 0;
        }
    }
    showLections("lections", {type : "html-list"});
    document.getElementById('filter').querySelector("button[name=reset]").classList.add("hidden");

}
