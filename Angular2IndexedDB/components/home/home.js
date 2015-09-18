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
var todo_1 = require('../todo/todo');
var indexedDB_1 = require('../../services/indexedDB');
var indexedDBEntities_1 = require('../../services/indexedDBEntities');
var home = (function () {
    function home(indexedDB, indexedDBEntities) {
        var _this = this;
        this.indexedDB = indexedDB;
        this.indexedDBEntities = indexedDBEntities;
        this.indexedDB.dbOpenAsync("appDB", 1, function () {
            _this.indexedDB.getAllRecordsAsync("todoStore", function (result) {
                result.forEach(function (element) {
                    _this.indexedDBEntities.getTodo(element);
                });
            });
        });
    }
    home = __decorate([
        angular2_1.Component({
            selector: 'home',
            bindings: [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities]
        }),
        angular2_1.View({
            templateUrl: './components/home/home.html',
            directives: [todo_1.todo, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities])
    ], home);
    return home;
})();
exports.home = home;
