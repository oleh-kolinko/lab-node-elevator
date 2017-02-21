const Elevator = require('./elevator.js');
const Person = require('./person.js');

const elevator = new Elevator();
const p1 = new Person('Mary',3,7);
const p2 = new Person('Sabina',5,2);
const p3 = new Person('Fernanda',4,8);
const p4 = new Person('Sabina',3,2);

elevator.start();
elevator.call(p1);
elevator.call(p2);
elevator.call(p3);
