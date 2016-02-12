/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB with Entities in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register(['angular2/core', '../models/objectStores'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, objectStores_1;
    var IndexedDB;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (objectStores_1_1) {
                objectStores_1 = objectStores_1_1;
            }],
        execute: function() {
            /**
             * IndexedDB class: db operations.
             *
             * @author Roberto Simonetti
             */
            IndexedDB = (function () {
                function IndexedDB() {
                }
                /**
                 * Open the database.
                 *
                 * @param dbName
                 * @param version
                 */
                IndexedDB.prototype.dbOpenAsync = function (dbName, version, callback) {
                    var _this = this;
                    // Specifies name and version.
                    var request = indexedDB.open(dbName, version);
                    // Success.
                    request.onsuccess = function (event) {
                        _this.db = event.target.result;
                        console.log("dbOpen:", event.target.readyState);
                        callback();
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("dbOpen:", event.target.error.name);
                    };
                    request.onupgradeneeded = function (event) {
                        // The db doesn't exist, so crete the object stores.
                        _this.db = event.target.result;
                        ;
                        // Instantiates the ObjectStores class and call the createStores method.
                        var objectStores = new objectStores_1.ObjectStores();
                        objectStores.createStores(_this.db);
                    };
                };
                /**
                 * Gets the object store.
                 *
                 * @param name
                 * @param mode
                 * @return The object store
                 */
                IndexedDB.prototype.getObjectStore = function (name, mode) {
                    var tx = this.db.transaction(name, mode);
                    return tx.objectStore(name);
                };
                /**
                 * Gets all records.
                 *
                 * @param storeName The object store name
                 */
                IndexedDB.prototype.getAllRecordsAsync = function (storeName, callback) {
                    var result = []; // Return the records into an array.
                    var store = this.getObjectStore(storeName, "readonly"); // Gets the store.
                    var request = store.openCursor();
                    // Success.
                    request.onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            result.push(cursor.value);
                            cursor.continue();
                        }
                        else {
                            console.log("getAllRecords:", event.target.readyState);
                            callback(result); // On success, calls callback and pass result.
                        }
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("getAllRecords:", event.target.error.name);
                    };
                };
                /**
                 * Adds a record.
                 *
                 * @param storeName The object store name
                 * @param record The record to add
                 */
                IndexedDB.prototype.addRecordAsync = function (storeName, record) {
                    var store = this.getObjectStore(storeName, "readwrite"); // Gets the store.
                    var request = store.add(record); // Adds a new record.
                    // Success.
                    request.onsuccess = function (event) {
                        console.log("addRecord:", event.target.readyState);
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("addRecord:", event.target.error.name);
                    };
                };
                /**
                 * Deletes a record.
                 *
                 * @param storeName The object store name
                 * @param key The key of the record to delete
                 */
                IndexedDB.prototype.deleteRecordAsync = function (storeName, key) {
                    var store = this.getObjectStore(storeName, "readwrite"); // Gets the store.
                    var request = store.delete(key); // Deletes the record by the key.
                    // Success.
                    request.onsuccess = function (event) {
                        console.log("deleteRecord:", event.target.readyState);
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("deleteRecord:", event.target.error.name);
                    };
                };
                /**
                 * Edits a record.
                 *
                 * @param storeName The object store name
                 * @param record The record to update
                 */
                IndexedDB.prototype.editRecordAsync = function (storeName, record) {
                    var store = this.getObjectStore(storeName, "readwrite"); // Gets the store.
                    var request = store.put(record); // Puts the updated record back into the database.
                    // Success.
                    request.onsuccess = function (event) {
                        console.log("editRecord:", event.target.readyState);
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("editRecord:", event.target.error.name);
                    };
                };
                /**
                 * Clears an object store.
                 *
                 * @param storeName The object store name
                 */
                IndexedDB.prototype.clearObjectStoreAsync = function (storeName) {
                    var store = this.getObjectStore(storeName, "readwrite"); // Gets the store.
                    var request = store.clear(); // Clears the object store.
                    // Success.
                    request.onsuccess = function (event) {
                        console.log("clearObjectStore:", event.target.readyState);
                    };
                    // Error.
                    request.onerror = function (event) {
                        console.error("clearObjectStore:", event.target.error.name);
                    };
                };
                IndexedDB = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], IndexedDB);
                return IndexedDB;
            })();
            exports_1("IndexedDB", IndexedDB);
        }
    }
});
