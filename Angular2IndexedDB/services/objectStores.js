// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB
var ObjectStores = (function () {
    function ObjectStores() {
    }
    ObjectStores.prototype.createStores = function (db) {
        /**
         * object store
         *
         * key               value
         *
         * record1
         * record2
         * ...
         */
        var todoStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
    };
    return ObjectStores;
})();
exports.ObjectStores = ObjectStores;
