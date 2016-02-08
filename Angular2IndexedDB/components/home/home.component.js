System.register(['angular2/core', '../todo/todo.component', '../../services/indexedDB', '../../models/indexedDBEntities'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_component_1, indexedDB_1, indexedDBEntities_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_component_1_1) {
                todo_component_1 = todo_component_1_1;
            },
            function (indexedDB_1_1) {
                indexedDB_1 = indexedDB_1_1;
            },
            function (indexedDBEntities_1_1) {
                indexedDBEntities_1 = indexedDBEntities_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(indexedDB, indexedDBEntities) {
                    var _this = this;
                    this.indexedDB = indexedDB;
                    this.indexedDBEntities = indexedDBEntities;
                    // OPENS THE DB ASYNCHRONOUSLY & LOADS DATA INTO ENTITIES
                    // DATA WILL BE AVAILABLE ON THE NEXT CHANGE DETECTION
                    // @param dbName
                    // @param version
                    this.indexedDB.dbOpenAsync("appDB", 1, function () {
                        // The object stores will be loaded asynchronously.
                        // Calls the getAllRecords asynchronous method.
                        // @param storeName
                        _this.indexedDB.getAllRecordsAsync("todoStore", function (result) {
                            result.forEach(function (record) {
                                // LOADS DATA INTO ENTITIES
                                _this.indexedDBEntities.addTodo(record); // Entities getTodo method.
                            });
                        });
                        // Add a new call to the getAllRecords asynchronous method here. 
                    }); // If the db doesn't exist, it will be created.
                }
                HomeComponent = __decorate([
                    // IndexedDBEntities class & entities.
                    core_1.Component({
                        selector: 'home-component',
                        providers: [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities] // IndexedDB & Entities providers: inherited by all descendants.
                    }),
                    core_1.View({
                        templateUrl: './components/home/home.component.html',
                        directives: [todo_component_1.TodoComponent]
                    }), 
                    __metadata('design:paramtypes', [indexedDB_1.IndexedDB, indexedDBEntities_1.IndexedDBEntities])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
