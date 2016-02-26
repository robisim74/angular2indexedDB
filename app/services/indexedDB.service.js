/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register(['angular2/core', 'rxjs/Observable', '../models/object-store'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, object_store_1;
    var IndexedDBService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (object_store_1_1) {
                object_store_1 = object_store_1_1;
            }],
        execute: function() {
            /**
             * IndexedDBService class: database operations.
             * https://w3c.github.io/IndexedDB/
             *
             * Basic usage.
             *
             * // Services.
             * import {IndexedDBService} from './services/indexedDB.service'; // IndexedDBService class.
             *
             * @Component({
             *     selector: 'app-component',
             *     ...
             *     providers: [IndexedDBService]
             * })
             *
             * export class AppComponent {
             *
             *     constructor(public indexedDB: IndexedDBService) { }
             *
             * }
             *
             * In the ObjctStore model, add the object stores:
             *
             * createStores(db: IDBDatabase) {
             *
             *     // Creates "TodoStore".
             *     var todoStore: IDBObjectStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
             *     // Add new stores here.
             *
             * }
             *
             * IndexedDBService methods.
             *
             * Each method can be invoked with the forEach method, which accepts a single callback and returns a promise:
             *
             * // Opens the database.
             * this.indexedDB.openDBAsync(dbName, 1).forEach(
             *
             *     // Next.
             *     (readyState: string) => {
             *
             *         console.log('IndexedDB service: opening db: ' + readyState);
             *
             *     }, null
             *
             * );
             *
             * @author Roberto Simonetti
             */
            IndexedDBService = (function () {
                function IndexedDBService() {
                }
                /**
                 * Opens the database.
                 *
                 * @param dbName The name of the database which identifies it within a specific origin
                 * @param version The version of the database
                 * @return An observable of readyState
                 */
                IndexedDBService.prototype.openDBAsync = function (dbName, version) {
                    var _this = this;
                    return new Observable_1.Observable(function (observer) {
                        // Opens the database.
                        var request = indexedDB.open(dbName, version);
                        // Success.
                        request.onsuccess = function (event) {
                            // Instances the db object.
                            _this.db = event.target.result;
                            observer.next(event.target.readyState);
                            observer.complete();
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                        // The db doesn't exist, so cretes it.
                        request.onupgradeneeded = function (event) {
                            // Instances the db object.
                            _this.db = event.target.result;
                            ;
                            // Instances the ObjectStores class and calls the createStores method.
                            var objectStores = new object_store_1.ObjectStore();
                            objectStores.createStores(_this.db);
                            console.log('IndexedDB service: creating ' + dbName + ' completed.');
                        };
                    });
                };
                /**
                 * Gets the object store.
                 *
                 * @param storeName The name of the object store
                 * @param mode Transaction mode
                 * @return The object store
                 */
                IndexedDBService.prototype.getObjectStore = function (storeName, mode) {
                    var tx = this.db.transaction(storeName, mode);
                    return tx.objectStore(storeName);
                };
                /**
                 * Gets all records.
                 *
                 * @param storeName The name of the object store
                 * @return An observable of record
                 */
                IndexedDBService.prototype.getAllRecordsAsync = function (storeName) {
                    // Gets the object store.
                    var store = this.getObjectStore(storeName, "readonly");
                    return new Observable_1.Observable(function (observer) {
                        var request = store.openCursor();
                        // Success.
                        request.onsuccess = function (event) {
                            // Steps through all the values in the object store.
                            var cursor = event.target.result;
                            if (cursor) {
                                observer.next(cursor.value);
                                cursor.continue();
                            }
                            else {
                                observer.complete();
                            }
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                    });
                };
                /**
                 * Adds a record.
                 *
                 * @param storeName The name of the object store
                 * @param record The record to add
                 * @return An observable of readyState
                 */
                IndexedDBService.prototype.addRecordAsync = function (storeName, record) {
                    // Gets the object store.
                    var store = this.getObjectStore(storeName, "readwrite");
                    return new Observable_1.Observable(function (observer) {
                        var request = store.add(record); // Adds a new record.
                        // Success.
                        request.onsuccess = function (event) {
                            observer.next(event.target.readyState);
                            observer.complete();
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                    });
                };
                /**
                 * Deletes a record.
                 *
                 * @param storeName The name of the object store
                 * @param key The key of the record to delete
                 * @return An observable of readyState
                 */
                IndexedDBService.prototype.deleteRecordAsync = function (storeName, key) {
                    // Gets the object store.
                    var store = this.getObjectStore(storeName, "readwrite");
                    return new Observable_1.Observable(function (observer) {
                        var request = store.delete(key); // Deletes the record by the key.
                        // Success.
                        request.onsuccess = function (event) {
                            observer.next(event.target.readyState);
                            observer.complete();
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                    });
                };
                /**
                 * Edits a record.
                 *
                 * @param storeName The name of the object store
                 * @param record The record to update
                 * @return An observable of readyState
                 */
                IndexedDBService.prototype.editRecordAsync = function (storeName, record) {
                    // Gets the object store.
                    var store = this.getObjectStore(storeName, "readwrite");
                    return new Observable_1.Observable(function (observer) {
                        var request = store.put(record); // Puts the updated record back into the database.
                        // Success.
                        request.onsuccess = function (event) {
                            observer.next(event.target.readyState);
                            observer.complete();
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                    });
                };
                /**
                 * Clears an object store.
                 *
                 * @param storeName The name of the object store
                 * @return An observable of readyState
                 */
                IndexedDBService.prototype.clearObjectStoreAsync = function (storeName) {
                    // Gets the object store.
                    var store = this.getObjectStore(storeName, "readwrite");
                    return new Observable_1.Observable(function (observer) {
                        var request = store.clear(); // Clears the object store.
                        // Success.
                        request.onsuccess = function (event) {
                            observer.next(event.target.readyState);
                            observer.complete();
                        };
                        // Error.
                        request.onerror = function (event) {
                            console.log('IndexedDB service: ' + event.target.error.name);
                            observer.error(event.target.error.name);
                        };
                    });
                };
                /**
                 * Closes the database.
                 */
                IndexedDBService.prototype.closeDB = function () {
                    this.db.close();
                };
                IndexedDBService = __decorate([
                    // ObjectStore class.
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], IndexedDBService);
                return IndexedDBService;
            })();
            exports_1("IndexedDBService", IndexedDBService);
        }
    }
});
