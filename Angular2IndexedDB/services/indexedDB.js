// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB
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
// IndexedDB class
// db operations
// dependencies:
// - angular: v2.0.0-alpha.45
var angular2_1 = require('angular2/angular2');
var objectStores_1 = require('./objectStores');
var IndexedDB = (function () {
    function IndexedDB() {
    }
    // open the database
    IndexedDB.prototype.dbOpenAsync = function (dbName, version, callback) {
        var _this = this;
        // specify the name and version
        var request = indexedDB.open(dbName, version);
        // success
        request.onsuccess = function (event) {
            _this.db = event.target.result;
            console.log("dbOpen:", event.target.readyState);
            callback();
        };
        // error
        request.onerror = function (event) {
            console.error("dbOpen:", event.target.error.name);
        };
        request.onupgradeneeded = function (event) {
            // the db doesn't exist, so crete object stores
            _this.db = event.target.result;
            ;
            // instantiate Object Stores class
            // and call create stores method
            var objectStores = new objectStores_1.ObjectStores();
            objectStores.createStores(_this.db);
        };
    };
    // get object store
    IndexedDB.prototype.getObjectStore = function (name, mode) {
        var tx = this.db.transaction(name, mode);
        return tx.objectStore(name);
    };
    // indexedDB methods
    // get all records
    IndexedDB.prototype.getAllRecordsAsync = function (storeName, callback) {
        var result = []; // return records into an array
        var store = this.getObjectStore(storeName, "readonly"); // get store
        var request = store.openCursor();
        // success
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            }
            else {
                console.log("getAllRecords:", event.target.readyState);
                callback(result); // on success, call callback and pass result
            }
        };
        // error
        request.onerror = function (event) {
            console.error("getAllRecords:", event.target.error.name);
        };
    };
    // add a record
    IndexedDB.prototype.addRecordAsync = function (storeName, record) {
        var store = this.getObjectStore(storeName, "readwrite"); // get store
        var request = store.add(record); // add a new record
        // success
        request.onsuccess = function (event) {
            console.log("addRecord:", event.target.readyState);
        };
        // error
        request.onerror = function (event) {
            console.error("addRecord:", event.target.error.name);
        };
    };
    // delete a record
    IndexedDB.prototype.deleteRecordAsync = function (storeName, key) {
        var store = this.getObjectStore(storeName, "readwrite"); // get store
        var request = store.delete(key); // delete record by key
        // success
        request.onsuccess = function (event) {
            console.log("deleteRecord:", event.target.readyState);
        };
        // error
        request.onerror = function (event) {
            console.error("deleteRecord:", event.target.error.name);
        };
    };
    // clear an object store
    IndexedDB.prototype.clearObjectStoreAsync = function (storeName) {
        var store = this.getObjectStore(storeName, "readwrite"); // get store
        var request = store.clear(); // clear object store
        // success
        request.onsuccess = function (event) {
            console.log("clearObjectStore:", event.target.readyState);
        };
        // error
        request.onerror = function (event) {
            console.error("clearObjectStore:", event.target.error.name);
        };
    };
    IndexedDB = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IndexedDB);
    return IndexedDB;
})();
exports.IndexedDB = IndexedDB;
