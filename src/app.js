const SchoolManager = require("./schools/school-manager");
const ClassRoomManager = require("./classrooms/classroom-manager");
const TeacherManager = require("./teachers/teacher-manager");
const LectionManager = require("./lections/lection-manager");

let scheduleApp = {};

scheduleApp.school = new SchoolManager();
scheduleApp.teacher = new TeacherManager();
scheduleApp.classroom = new ClassRoomManager();
scheduleApp.lection = new LectionManager();

window.scheduleApp = scheduleApp;



