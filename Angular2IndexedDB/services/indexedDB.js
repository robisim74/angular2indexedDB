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
/// <reference path="../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var objectStores_1 = require('./objectStores');
var IndexedDB = (function () {
    function IndexedDB() {
    }
    IndexedDB.prototype.dbOpenAsync = function (dbName, version, callback) {
        var _this = this;
        var request = indexedDB.open(dbName, version);
        request.onsuccess = function (event) {
            _this.db = event.target.result;
            console.log("dbOpen:", event.target.readyState);
            callback();
        };
        request.onerror = function (event) {
            console.error("dbOpen:", event.target.error.name);
        };
        request.onupgradeneeded = function (event) {
            _this.db = event.target.result;
            ;
            var objectStores = new objectStores_1.ObjectStores();
            objectStores.createStores(_this.db);
        };
    };
    IndexedDB.prototype.getObjectStore = function (name, mode) {
        var tx = this.db.transaction(name, mode);
        return tx.objectStore(name);
    };
    IndexedDB.prototype.getAllRecordsAsync = function (storeName, callback) {
        var result = [];
        var store = this.getObjectStore(storeName, "readonly");
        var request = store.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            }
            else {
                console.log("getAllRecords:", event.target.readyState);
                callback(result);
            }
        };
        request.onerror = function (event) {
            console.error("getAllRecords:", event.target.error.name);
        };
    };
    IndexedDB.prototype.addRecordAsync = function (storeName, record) {
        var store = this.getObjectStore(storeName, "readwrite");
        var request = store.add(record);
        request.onsuccess = function (event) {
            console.log("addRecord:", event.target.readyState);
        };
        request.onerror = function (event) {
            console.error("addRecord:", event.target.error.name);
        };
    };
    IndexedDB.prototype.deleteRecordAsync = function (storeName, key) {
        var store = this.getObjectStore(storeName, "readwrite");
        var request = store.delete(key);
        request.onsuccess = function (event) {
            console.log("deleteRecord:", event.target.readyState);
        };
        request.onerror = function (event) {
            console.error("deleteRecord:", event.target.error.name);
        };
    };
    IndexedDB.prototype.clearObjectStoreAsync = function (storeName) {
        var store = this.getObjectStore(storeName, "readwrite");
        var request = store.clear();
        request.onsuccess = function (event) {
            console.log("clearObjectStore:", event.target.readyState);
        };
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
