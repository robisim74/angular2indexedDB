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
var indexedDB_1 = require('../../services/indexedDB');
var indexedDBEntities_1 = require('../../services/indexedDBEntities');
var todo = (function () {
    function todo(indexedDB, indexedDBEntities) {
        this.indexedDB = indexedDB;
        this.indexedDBEntities = indexedDBEntities;
    }
    todo.prototype.todos = function () {
        return this.indexedDBEntities.todos;
    };
    todo.prototype.addTodo = function (description) {
        var record = new indexedDBEntities_1.Todo();
        record.todoId = this.indexedDBEntities.createKey();
        record.description = description;
        this.indexedDB.addRecordAsync("todoStore", record);
        this.indexedDBEntities.addTodo(record);
    };
    todo.prototype.deleteTodo = function (todo) {
        var key = todo.todoId;
        this.indexedDB.deleteRecordAsync("todoStore", key);
        this.indexedDBEntities.deleteTodo(todo);
    };
    todo.prototype.clearTodos = function () {
        this.indexedDB.clearObjectStoreAsync("todoStore");
        this.indexedDBEntities.clearTodos();
    };
    todo = __decorate([
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
