/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register([], function(exports_1) {
    var ObjectStore;
    return {
        setters:[],
        execute: function() {
            /**
             * ObjectStore class.
             * Defines the object stores of the database.
             * The object stores are the primary storage mechanism for storing data in the database.
             * https://w3c.github.io/IndexedDB/
             *
             * @author Roberto Simonetti
             */
            ObjectStore = (function () {
                function ObjectStore() {
                }
                /**
                 * Creates the object stores.
                 * The object store has a list of records which hold the data stored in the object store.
                 * Each record consists of a key and a value.
                 *
                 * @param db The database
                 */
                ObjectStore.prototype.createStores = function (db) {
                    // Creates "TodoStore".
                    var todoStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
                    // Add new stores here.
                };
                return ObjectStore;
            })();
            exports_1("ObjectStore", ObjectStore);
        }
    }
});
