// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// IndexedDBEntities class
// define object stores entities & own methods
var angular2_1 = require('angular2/angular2');
// define every object store entity
// EXAMPLE TODO
var Todo = (function () {
    function Todo() {
    }
    return Todo;
})();
exports.Todo = Todo;
// add a new entity here
var IndexedDBEntities = (function () {
    function IndexedDBEntities() {
        // OBJECT STORES ENTITIES as arrays
        // EXAMPLE TODO
        this.todos = []; // todos entity
    }
    // add new entity here
    // ENTITIES METHODS
    // EXAMPLE TODO
    // get todo
    IndexedDBEntities.prototype.getTodo = function (record) {
        this.todos.push(record);
    };
    // add todo
    IndexedDBEntities.prototype.addTodo = function (record) {
        this.todos.push(record);
    };
    // example of key
    IndexedDBEntities.prototype.createKey = function () {
        // find max key
        var key = 0;
        this.todos.forEach(function (todo) {
            if (todo.todoId > key) {
                key = todo.todoId;
            }
        });
        return (key + 1);
    };
    // delete todo	
    IndexedDBEntities.prototype.deleteTodo = function (record) {
        var index = this.todos.indexOf(record);
        this.todos.splice(index, 1);
    };
    // edit todo	
    IndexedDBEntities.prototype.editTodo = function (record) {
        var index = this.todos.indexOf(record);
        this.todos[index].todoId = record.todoId;
        this.todos[index].description = record.description;
    };
    // clear todos
    IndexedDBEntities.prototype.clearTodos = function () {
        this.todos.splice(0);
    };
    IndexedDBEntities = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IndexedDBEntities);
    return IndexedDBEntities;
})();
exports.IndexedDBEntities = IndexedDBEntities;
