System.register(['angular2/core', '../../services/indexedDB', '../../services/indexedDBEntities'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, indexedDB_1, indexedDBEntities_1;
    var todo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (indexedDB_1_1) {
                indexedDB_1 = indexedDB_1_1;
            },
            function (indexedDBEntities_1_1) {
                indexedDBEntities_1 = indexedDBEntities_1_1;
            }],
        execute: function() {
            todo = (function () {
                function todo(indexedDB, indexedDBEntities) {
                    this.indexedDB = indexedDB;
                    this.indexedDBEntities = indexedDBEntities;
                }
                // List of the todos.
                todo.prototype.todos = function () {
                    return this.indexedDBEntities.todos;
                };
                // Adds a todo.
                todo.prototype.addTodo = function (description) {
                    // UPDATES INDEXEDDB ASYNCHRONOUSLY
                    // record: key & value of the object store.
                    var record = new indexedDBEntities_1.Todo();
                    record.todoId = this.indexedDBEntities.createKey();
                    record.description = description;
                    // Calls the addRecord asynchronous method.
                    // @param storeName
                    // @param record
                    this.indexedDB.addRecordAsync("todoStore", record);
                    // UPDATES ENTITIES NOW
                    this.indexedDBEntities.addTodo(record); // Entities addTodo method.
                };
                // Deletes a todo.
                todo.prototype.deleteTodo = function (record) {
                    // UPDATES INDEXEDDB ASYNCHRONOUSLY
                    var key = record.todoId;
                    // Calls the deleteRecord asynchronous method.
                    // @param storeName
                    // @param key
                    this.indexedDB.deleteRecordAsync("todoStore", key);
                    // UPDATES ENTITIES NOW
                    this.indexedDBEntities.deleteTodo(record); // Entities deleteTodo method.
                };
                // Edits a todo.
                todo.prototype.editTodo = function (record) {
                    // UPDATES INDEXEDDB ASYNCHRONOUSLY 
                    // Calls the editRecord asynchronous method.
                    // @param storeName
                    // @param record
                    this.indexedDB.editRecordAsync("todoStore", record);
                    // UPDATES ENTITIES NOW
                    this.indexedDBEntities.editTodo(record); // Entities editTodo method.
                };
                // Clears the todos.
                todo.prototype.clearTodos = function () {
                    // UPDATES INDEXEDDB ASYNCHRONOUSLY     
                    // Calls the clearObjectStore asynchronous method.
                    // @param storeName
                    this.indexedDB.clearObjectStoreAsync("todoStore");
                    // UPDATES ENTITIES NOW       
                    this.indexedDBEntities.clearTodos(); // Entities clearTodos method.
                };
                todo = __decorate([
                    // IndexedDBEntities class & entities.
                    core_1.Component({
                        selector: 'todo'
                    }),
                    core_1.View({
                        templateUrl: './components/todo/todo.html'
                    }), 
                    __metadata('design:paramtypes', [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities])
                ], todo);
                return todo;
            })();
            exports_1("todo", todo);
        }
    }
});
