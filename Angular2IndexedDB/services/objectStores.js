/**
 * ANGULAR 2 INDEXEDDB
 * indexedDB with entities in the angular 2 applications using typescript
 * written by roberto simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */
System.register([], function(exports_1) {
    var ObjectStores;
    return {
        setters:[],
        execute: function() {
            /**
             * ObjectStores class
             * define the object stores of db
             *
             * @author roberto simonetti
             */
            ObjectStores = (function () {
                function ObjectStores() {
                }
                /**
                 * create object stores
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
                    // create todo store
                    var todoStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
                    // add new stores here
                };
                return ObjectStores;
            })();
            exports_1("ObjectStores", ObjectStores);
        }
    }
});
