// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB

// ObjectStores class
// define the object stores of db

export class ObjectStores {
	
    // create object stores
    createStores(db: IDBDatabase) {

        /**
         * object store
         * 
         * key               value
         *
         * record1
         * record2
         * ...
         */
          
        // EXAMPLE TODO
        // create todo store
        var todoStore: IDBObjectStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
		
        // add new stores here
    }

}