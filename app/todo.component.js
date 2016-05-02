System.register(['angular2/core', 'rxjs/Observable', './services/indexedDB.service', './models/entity'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, indexedDB_service_1, entity_1;
    var TodoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (indexedDB_service_1_1) {
                indexedDB_service_1 = indexedDB_service_1_1;
            },
            function (entity_1_1) {
                entity_1 = entity_1_1;
            }],
        execute: function() {
            TodoComponent = (function () {
                function TodoComponent(indexedDB, entity) {
                    this.indexedDB = indexedDB;
                    this.entity = entity;
                    this.description = "";
                }
                Object.defineProperty(TodoComponent.prototype, "todos", {
                    // Gets todos.
                    get: function () {
                        var _this = this;
                        return new Observable_1.Observable(function (observer) {
                            observer.next(_this.entity.todos);
                            observer.complete();
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                // Adds a todo.
                TodoComponent.prototype.addTodo = function (description) {
                    // Creates a new record.
                    var record = new entity_1.Todo();
                    record.todoId = this.entity.createKey();
                    record.description = description;
                    // Adds the record.
                    this.indexedDB.addRecordAsync("TodoStore", record).forEach(
                    // Next.
                    function (readyState) { console.log('IndexedDB service: adding record: ' + readyState); }, null);
                    // Updates the entity. 
                    this.entity.addTodo(record);
                    // Clears description.
                    this.description = "";
                };
                // Deletes a todo.
                TodoComponent.prototype.deleteTodo = function (record) {
                    // Gets the record key.
                    var key = record.todoId;
                    // Deletes the record.
                    this.indexedDB.deleteRecordAsync("TodoStore", key).forEach(
                    // Next.
                    function (readyState) { console.log('IndexedDB service: deleting record: ' + readyState); }, null);
                    // Updates the entity. 
                    this.entity.deleteTodo(record);
                };
                // Edits a todo.
                TodoComponent.prototype.editTodo = function (record) {
                    // Edits the record.
                    this.indexedDB.editRecordAsync("TodoStore", record).forEach(
                    // Next.
                    function (readyState) { console.log('IndexedDB service: editing record: ' + readyState); }, null);
                    // Updates the entity. 
                    this.entity.editTodo(record);
                };
                // Clears the todos.
                TodoComponent.prototype.clearTodos = function () {
                    // Clears the object store.
                    this.indexedDB.clearObjectStoreAsync("TodoStore").forEach(
                    // Next.
                    function (readyState) { console.log('IndexedDB service: clearing object store: ' + readyState); }, null);
                    // Updates the entity.       
                    this.entity.clearTodos();
                };
                // Sorts by description.
                TodoComponent.prototype.sortTodos = function () {
                    this.entity.sortTodos();
                };
                TodoComponent = __decorate([
                    core_1.Component({
                        selector: 'todo-component',
                        templateUrl: './app/todo.component.html'
                    }), 
                    __metadata('design:paramtypes', [indexedDB_service_1.IndexedDBService, entity_1.Entity])
                ], TodoComponent);
                return TodoComponent;
            }());
            exports_1("TodoComponent", TodoComponent);
        }
    }
});
