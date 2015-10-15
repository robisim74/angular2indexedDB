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
    todo.prototype.deleteTodo = function (todo) {
        // UPDATE INDEXEDDB ASYNCHRONOUSLY
        var key = todo.todoId;
        // call deleteRecord asynchronous method
        // @param {string} storeName
        // @param {any} key
        this.indexedDB.deleteRecordAsync("todoStore", key);
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.deleteTodo(todo); // entities deleteTodo method
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
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities])
    ], todo);
    return todo;
})();
exports.todo = todo;
