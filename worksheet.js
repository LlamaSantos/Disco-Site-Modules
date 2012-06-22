var util = require("util");
var resourceful = require("resourceful");

var Person = resourceful.define("person");
Person.property("first"),
Person.property("middle").string(),
Person.property("last");


console.info(Person);
var EventEmitter = require("events").EventEmitter;

var obj = function (){};
util.inherits(obj, EventEmitter);
console.info(util.inspect(obj));
var o = new obj();

o.on("fn", function (){
    console.log('fn called.');
});

o.emit('fn');

var i = obj.bind({first: 'james'});
var k = new i();
k.on("name", function (){
    console.log(this.first);
});
k.emit('name');


