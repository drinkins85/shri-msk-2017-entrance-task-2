# Школы

## scheduleApp.school. addSchool(name, count)  -  добавление школы
	name(string) – Название школы
	count(number) – Количкство учеников
	
```
//Пример
scheduleApp.school. addSchool("Школа разработки интерфейсов", 50)
```
## scheduleApp.school.getSchools([param]) – получение списка школ
В качестве параметра принимается объект параметров

* type : "html-list" – результат в виде html кода
* type : "html-select" – результат в виде элемента select
* sort: {field : “имя поля”, sort-order: “asc/desc” } - сортировка

```
//Пример
scheduleApp.school.getSchools({type : "html-list", sort: {field : "name", order : "asc"}})
```
Если параметр type не указан – результат возвращается в виде массива.
Если ничего не найдено -  false

## scheduleApp.school.getSchoolById(id) – возвращает школу по id
```
scheduleApp.school.getSchoolById(1)
```
Возвращает объект School
Методы 
* .getId() – возвращает id
* .getName() – возвращает название 
* .getCount()– возвращает количество учеников
* .getJSON() – возвращает объект School в формате JSON

## scheduleApp.school.deleteSchool(id) – удаляет школу по id
```
scheduleApp.school.deleteSchool(1)
```
- Есть ли в расписании лекции для этой школы (прошедшие лекции не учитываются). Удаление невозможно если для школы запланированы лекции.


# Аудитории
## scheduleApp.classroom.addClassRoom(name, capacity, description) – добавление аудитории
* name(string) – название аудитории
* capacity(number) – вместимость
* description(string)-описание
```
scheduleApp.classroom.addClassRoom("Синий кит", 50, "Второй этаж")
```
	
## scheduleApp.classroom.getClassRooms([param]) – получение списка аудиторий
В качестве параметра принимается объект параметров
* type : "html-list" – результат в виде html кода
* type : "html-select" – результат в виде элемента select
* sort: {field : “имя поля”, sort-order: “asc/desc” } - сортировка
```
//Пример
scheduleApp.classroom.getClassRooms({type : "html-list", sort: {field : "name", order : "asc"}})
```
Если параметр type не указан – результат возвращается в виде массива.
Если ничего не найдено -  false

## scheduleApp.classroom.getClassRoomById(id) – возвращает аудиторию по id
```
scheduleApp.classroom.getClassRoomById(1)
```
Возвращает объект ClassRoom
Методы 
* .getId() – возвращает id
* .getName() – возвращает название 
* .getCapacity()– возвращает  вместимость
* .getDescription() – возвращает описание
* .getJSON() – возвращает объект ClassRoom в формате JSON

## scheduleApp.classroom.deleteClassRoom(id) – удаляет аудиторию по id
```
scheduleApp.classroom.deleteClassRoom(1)
```
При удалении проверяются следующие условия:
- Есть ли в расписании лекции в этой аудитории (прошедшие лекции не учитываются). Удаление невозможно если в аудитории запланированы лекции.


# Преподаватели
## scheduleApp.teacher.addTeacher(firstname, lastname, company [, description]) – добавление преподавателя
```
scheduleApp.classroom.addTeacher("Иван", "Иванов", "Яндекс")
```
* firstname(string) - имя
* lastname(string) - фамилия
* company(string) - компания
* description(string) – описание (не обязятельно)

## scheduleApp.teacher.getTeachers([param]) – получение списка преподавателей
```
//Пример
scheduleApp.classroom.getTeachers({type : "html-list", sort: {field : "name", order : "asc"}})
```
В качестве параметра принимается объект параметров
* {type : "html-list"} – результат в виде html кода
* {type : "html-select"} – результат в виде элемента select
* sort: {field : “имя поля”, sort-order: “asc/desc” } - сортировка
Если параметр type не указан – результат возвращается в виде массива.

## scheduleApp.teacher.getTeacherById(id) – возвращает преподавателя по id
	Возвращает объект Teacher
```
scheduleApp.classroom.getTeacherById(1)
```
Методы 
* .getId() – возвращает id
* .getName() – возвращает фамилию и имя 
* .getCompany() – возвращает компанию
* .getDescription() – возвращает описание
* .getJSON() – возвращает объект Teacher в формате JSON

## scheduleApp.teacher.deleteTeacher(id) – удаляет преподавателя по id
```
scheduleApp.classroom.deleteTeacher(1)
```
При удалении проверяются следующие условия:
- Есть ли у этого преподавателя в расписании лекции (прошедшие лекции не учитываются). Удаление невозможно если у преподавателя запланированы лекции.

# Лекции
## scheduleApp.lection.addLection(name, dateStart, dateFinish, teacher, classRoom, schools) – добавление школы
* name(string) – тема лекции
* dateStart(object Date) – дата и время начала
* dateFinish(object Date)- дата и время окончания
* teacher(object Teacher) - преподаватель
* classroom(object ClassRoom) - аудитория
* schools(Array[object School]) – школы

## scheduleApp.lection.getLections([param]) – получение списка лекций
В качестве параметра принимается объект параметров
* type : "html-list" – результат в виде html кода
* type : "html-select" – результат в виде элемента select
Если параметр type не указан – результат возвращается в виде массива.

sort: {field : “имя поля”, sort-order: “asc/desc” } – сортировка

filter – объект параметров для фильтрации
* classRoom : id(number) - фильтр по id аудитории
* teacher: id(number) - фильтр по id преподавателя
* schools[ id1(number), id2(number).. ] – фильтр по школам (принимает массив id школ )
* dateStart: “YYYY-MM-DD”/ object Date – фильтр по дате начала (принимает строку в формате YYYY-MM-DD или объект Date)
* dateFinish: “YYYY-MM-DD”/ object Date – фильтр по дате окончания (принимает строку в формате YYYY-MM-DD или объект Date)
	Если ничего не найдено - возвращает false
```
scheduleApp.lection.getLections({dateStart: "2017-04-01", dateFinish: "2017-04-30", classRoom: 1, teacher: 1, schools: [1,2]})
```
## scheduleApp.lection.getLectionById(id) – возвращает лекцию по id
Возвращает объект Lection
Методы 
* .getId() – возвращает id
* .getName() – возвращает тему 
* .getDateStart() – возвращает дату и время начала
* .getDateFinish() – возвращает дату и время окончания
* .getTeacher()– возвращает преподавателя (объект Teacher)
* .getClassRoom() – возвращает аудиторию (объект ClassRoom)
* .getSchools() – возвращает школы (массив объектов School)
* .getJSON() – возвращает объект Teacher в формате JSON

## scheduleApp. teacher. deleteTeacher (id) – удаляет лекцию по id 

# Хранилище
В качестве хранилища используется MongoDB на сервисе www.mlab.com
Mlab предоставляет базу и API для работы по HTTP

# React + Redux
Вариант решения задачи с использованием библиотек React и Redux

https://github.com/drinkins85/ya-shri-2-react
https://drinkins85.github.io/ya-shri-2-react/public/


