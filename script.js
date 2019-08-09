
// Студенты на прототипах

// 1) Переделать 19 ДЗ через прототипы
// 2) методы:

// добавление оценки студенту за занятие
// (№ занятия === индекс оценки в массиве),

// получение средней оценки студента по имени
// Должны быть методами студента а не группы.

// 3) Только теперь функция конструктор группы студентов должна принимать
//  не массив, а список студентов через запятую.

// 3) Экземпляру созданому с помощью функции конструктора группы студентов
//  должны быть доступны не только методы описанные в ДЗ 19
//  но и все методы массива

///////////////////////////////////////////////////////////////////////

// =====>> Ниже старое задание

// task19

////////////////////////////////////////////////////////////////////
// Группа студентов

// 1) Реализовать функцию которая принимает имя и возраст студента
//  и возвращает объект с полями name, age, marks(пустой массив);

// 2)Реализовать функцию которая будет управлять студентами

// функция должна принимать массив студентов созданных с помощью предыдущей
// функции должна возвращать объект у которого будут следующие методы:
// добавления нового студента
// удаление студента по имени
// добавление оценки студенту за занятие(№ занятия === индекс оценки в массиве)
// получение средней оценки студента по имени
// получение средней оценки группы за занятие
// получение отсортированного по именам списка студентов
// получение отсортированного по среднему балу списка студентов

// 3) Работоспособность всех методов продемонстрировать ниже
//////////////////////////////////////////////////////////////////////

function Student(name, age){

	this.name = name;
	this.age = age;
	this.marks = [];
};

function Group () {
	this.push.apply (this, arguments);
}

Group.prototype = Object.create(Array.prototype);

Group.prototype.addStudent = function(student){
	this.push(student);
};

Group.prototype.deleteStudent = function (name) {
	var index = this.findIndex(function(item){
		return item.name === name;
	});
	if(index != -1){
		this.splice(index, 1);
	} 
};

Student.prototype.addMark = function (lessonNumber, mark) {
	this.marks[lessonNumber - 1] = mark;
};

//////////////////////////////////////////////////////////////////
///////Это решение дает неверный результат если оценок больше двух!!!
// Student.prototype.averageMark = function () {

//     return this.marks.reduce ( function (mark1, mark2) {
//         return (mark1 + mark2) / 2;
//     }, this.marks[0]);
// };

Student.prototype.averageMark = function () {

    var sum = this.marks.reduce ( function (sum, mark) {
        return sum += mark;
	}, 0);
	
	return sum / this.marks.length;
};


//////////////////////////////////////////////////////////////////
///////Это решение дает неверный результат если оценок больше двух!!!
// Group.prototype.averageGroupMark = function (lessonNumber) {

// 	return this.reduce (function (mark1, mark2){

// 		return (mark1 + (mark2.marks[lessonNumber-1] || 0)) / 2;
// 	},this[0].marks[lessonNumber-1]);
// };
//////////////////////////////////////////////////////////////////


Group.prototype.averageGroupMark = function (lessonNumber) {

	var sumMarks = this.reduce (function (sum, current){

		return sum + (current.marks[lessonNumber-1] || 0);
	},0);

	return sumMarks / this.length;
};

Group.prototype.getSortByName = function() {
			
	return this.sort (function(student1, student2){
		
	return (student1.name > student2.name) ?  1 : -1;
	});
};

Group.prototype.getSortByAverageMark = function () {
			
	return this.sort(function(student1, student2){
		
		var student1AverageMark = student1.averageMark();
		var student2AverageMark = student2.averageMark();

		return (student1AverageMark < student2AverageMark) ? 1 : -1;
	});
};


// Создаем студентов:

var serg = new Student ('Serg', 21);
var inna = new Student ('Inna', 23);
var ann = new Student ('Ann', 19);
var vic = new Student ('Vic', 22);
var andy = new Student ('Andy', 20);
var sam = new Student ('Sam', 22);

// Формируем из созданных студентов группу:

var group = new Group (serg, inna, ann, vic, andy, sam);

// Добавляем новых студентов:

var nick = new Student ('Nick', 19);
var sally = new Student ('Sally', 21);

group.addStudent (nick);
group.addStudent (sally);

// Удаляем студента по имени:

group.deleteStudent ('Ann');
group.deleteStudent ('Sam');

//  добавление оценки студенту за занятие
// (№ занятия === (индекс-1) оценки в массиве):

serg.addMark(1, 7);
serg.addMark(2, 9);
serg.addMark(3, 7);

inna.addMark(1, 10);
inna.addMark(2, 9);

vic.addMark(1, 9);
vic.addMark(2, 9);
vic.addMark(3, 8);

andy.addMark(1, 2);
andy.addMark(2, 3);

nick.addMark(1, 6);
nick.addMark(2, 10);

sally.addMark(1, 9);
sally.addMark(2, 6);
sally.addMark(3, 5);

// получение средней оценки студента по имени:

console.log (andy.averageMark());
console.log (nick.averageMark());
console.log (sally.averageMark());

console.log ('================================');

// получение средней оценки группы за занятие:

console.log (group.averageGroupMark(1));
console.log (group.averageGroupMark(2));
console.log (group.averageGroupMark(3));

console.log ('================================');

// получение отсортированного по именам списка студентов:

// Получаем новый отсортированный массив (для корректного отображения): 

var sortByName = group.getSortByName().slice();

console.log (sortByName);

console.log ('================================');

// получение отсортированного по среднему балу списка студентов 
// (от максимального к минимальному):

// Получаем новый отсортированный массив (для корректного отображения):

var SortByAverageMark = group.getSortByAverageMark().slice();

console.log (SortByAverageMark);