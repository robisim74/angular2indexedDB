/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB with entities in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register([], function(exports_1) {
    var ObjectStores;
    return {
        setters:[],
        execute: function() {
            /**
             * ObjectStores class.
             * Defines the object stores of the db.
             *
             * @author Roberto Simonetti
             */
            ObjectStores = (function () {
                function ObjectStores() {
                }
                /**
                 * Creates the object stores.
                 *
                 * key               value
                 *
                 * record1
                 * record2
                 *
                 * @param db
                 */
                ObjectStores.prototype.createStores = function (db) {
                    // EXAMPLE TODO
                    // Create the todo store.
                    var todoStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
                    // Add new stores here.
                };
                return ObjectStores;
            })();
            exports_1("ObjectStores", ObjectStores);
        }
    }
});
