System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var Todo, Entity;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Todo entity.
             */
            Todo = (function () {
                function Todo() {
                }
                return Todo;
            }());
            exports_1("Todo", Todo);
            /**
             * Entity class. Defines each entity and its methods.
             */
            Entity = (function () {
                function Entity() {
                    /**
                     * Todos entity.
                     */
                    this.todos = [];
                }
                /**
                 * Adds a todo.
                 *
                 * @param record
                 */
                Entity.prototype.addTodo = function (record) {
                    this.todos.push(record);
                };
                /**
                 * Deletes a todo.
                 *
                 * @param record
                 */
                Entity.prototype.deleteTodo = function (record) {
                    var index = this.todos.indexOf(record);
                    this.todos.splice(index, 1);
                };
                /**
                 * Edits a todo.
                 *
                 * @param record
                 */
                Entity.prototype.editTodo = function (record) {
                    var index = this.todos.indexOf(record);
                    this.todos[index].todoId = record.todoId;
                    this.todos[index].description = record.description;
                };
                /**
                 * Clears the todos entity.
                 */
                Entity.prototype.clearTodos = function () {
                    this.todos.splice(0);
                };
                /**
                 * Creates key.
                 *
                 * @return A new key
                 */
                Entity.prototype.createKey = function () {
                    // Generates and returns a RFC4122 v4 UUID.
                    return uuid.v4();
                };
                /**
                 * Sorts todos by description.
                 */
                Entity.prototype.sortTodos = function () {
                    this.todos = this.todos.sort(function (record1, record2) {
                        if (record1.description > record2.description) {
                            return 1;
                        }
                        if (record1.description < record2.description) {
                            return -1;
                        }
                        return 0;
                    });
                };
                Entity = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Entity);
                return Entity;
            }());
            exports_1("Entity", Entity);
        }
    }
});
