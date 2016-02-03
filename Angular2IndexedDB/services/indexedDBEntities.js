/**
 * ANGULAR 2 INDEXEDDB
 * indexedDB with entities in the new angular 2 applications using typescript
 * written by roberto simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Todo, IndexedDBEntities;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // define every object store entity
            // EXAMPLE TODO
            Todo = (function () {
                function Todo() {
                }
                return Todo;
            })();
            exports_1("Todo", Todo);
            // add a new entity here
            /**
             * IndexedDBEntities class
             * define object stores entities & own methods
             *
             * @author roberto simonetti
             */
            IndexedDBEntities = (function () {
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
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], IndexedDBEntities);
                return IndexedDBEntities;
            })();
            exports_1("IndexedDBEntities", IndexedDBEntities);
        }
    }
});
