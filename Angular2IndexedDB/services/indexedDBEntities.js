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
var angular2_1 = require('angular2/angular2');
var Todo = (function () {
    function Todo() {
    }
    return Todo;
})();
exports.Todo = Todo;
var IndexedDBEntities = (function () {
    function IndexedDBEntities() {
        this.todos = [];
    }
    IndexedDBEntities.prototype.getTodo = function (element) {
        var todo = new Todo();
        todo.todoId = element.todoId;
        todo.description = element.description;
        this.todos.push(todo);
    };
    IndexedDBEntities.prototype.addTodo = function (record) {
        var todo = new Todo();
        todo.todoId = record.todoId;
        todo.description = record.description;
        this.todos.push(todo);
    };
    IndexedDBEntities.prototype.createKey = function () {
        var key = 0;
        this.todos.forEach(function (todo) {
            if (todo.todoId > key) {
                key = todo.todoId;
            }
        });
        return (key + 1);
    };
    IndexedDBEntities.prototype.deleteTodo = function (todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
    };
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
