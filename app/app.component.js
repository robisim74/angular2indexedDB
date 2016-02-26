System.register(['angular2/core', './services/indexedDB.service', './models/entity', './todo.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, indexedDB_service_1, entity_1, todo_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (indexedDB_service_1_1) {
                indexedDB_service_1 = indexedDB_service_1_1;
            },
            function (entity_1_1) {
                entity_1 = entity_1_1;
            },
            function (todo_component_1_1) {
                todo_component_1 = todo_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(indexedDB, entity) {
                    this.indexedDB = indexedDB;
                    this.entity = entity;
                    // Opens the "Angular2IndexedDB" database. If it doesn't exist, it will be created.
                    this.openDB("Angular2IndexedDB");
                }
                AppComponent.prototype.openDB = function (dbName) {
                    var _this = this;
                    // Opens the database.
                    this.indexedDB.openDBAsync(dbName, 1).forEach(
                    // Next.
                    function (readyState) {
                        console.log('IndexedDB service: opening db: ' + readyState);
                    }, null).then(function () {
                        // Gets all records from "TodoStore".
                        _this.indexedDB.getAllRecordsAsync("TodoStore").forEach(
                        // Next.
                        function (record) {
                            // Adds next record to the Todos entity.
                            if (record != null) {
                                _this.entity.addTodo(record);
                            }
                        }, null).then(function () { return console.log('IndexedDB service: obtaining of all records completed.'); });
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app-component',
                        directives: [todo_component_1.TodoComponent],
                        templateUrl: './app/app.component.html',
                        providers: [indexedDB_service_1.IndexedDBService, entity_1.Entity]
                    }), 
                    __metadata('design:paramtypes', [indexedDB_service_1.IndexedDBService, entity_1.Entity])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
