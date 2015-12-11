var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
// services
var indexedDB_1 = require('../../services/indexedDB'); // IndexedDB class
var indexedDBEntities_1 = require('../../services/indexedDBEntities'); // IndexedDBEntities class & entities
var todo = (function () {
    function todo(indexedDB, indexedDBEntities) {
        this.indexedDB = indexedDB;
        this.indexedDBEntities = indexedDBEntities;
    }
    // list of todos
    todo.prototype.todos = function () {
        return this.indexedDBEntities.todos;
    };
    // add a todo
    todo.prototype.addTodo = function (description) {
        // UPDATE INDEXEDDB ASYNCHRONOUSLY
        // record: key & value of object store
        var record = new indexedDBEntities_1.Todo();
        record.todoId = this.indexedDBEntities.createKey();
        record.description = description;
        // call addRecord asynchronous method
        // @param {string} storeName
        // @param {any} record
        this.indexedDB.addRecordAsync("todoStore", record);
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.addTodo(record); // entities addTodo method
    };
    // delete a todo
    todo.prototype.deleteTodo = function (record) {
        // UPDATE INDEXEDDB ASYNCHRONOUSLY
        var key = record.todoId;
        // call deleteRecord asynchronous method
        // @param {string} storeName
        // @param {any} key
        this.indexedDB.deleteRecordAsync("todoStore", key);
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.deleteTodo(record); // entities deleteTodo method
    };
    // edit a todo
    todo.prototype.editTodo = function (record) {
        // UPDATE INDEXEDDB ASYNCHRONOUSLY 
        // call editRecord asynchronous method
        // @param {string} storeName
        // @param {any} record
        this.indexedDB.editRecordAsync("todoStore", record);
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.editTodo(record); // entities editTodo method
    };
    // clear todos
    todo.prototype.clearTodos = function () {
        // UPDATE INDEXEDDB ASYNCHRONOUSLY     
        // call clearObjectStore asynchronous method
        // @param {string} storeName
        this.indexedDB.clearObjectStoreAsync("todoStore");
        // UPDATE ENTITIES NOW       
        this.indexedDBEntities.clearTodos(); // entities clearTodos method
    };
    todo = __decorate([
        // IndexedDBEntities class & entities
        angular2_1.Component({
            selector: 'todo'
        }),
        angular2_1.View({
            templateUrl: './components/todo/todo.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities])
    ], todo);
    return todo;
})();
exports.todo = todo;
