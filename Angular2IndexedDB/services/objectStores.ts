/**
 * ANGULAR 2 INDEXEDDB
 * indexedDB with entities in the angular 2 applications using typescript
 * written by roberto simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

/**
 * ObjectStores class
 * define the object stores of db
 * 
 * @author roberto simonetti
 */
export class ObjectStores {

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
    createStores(db: IDBDatabase) {
          
        // EXAMPLE TODO
        // create todo store
        var todoStore: IDBObjectStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
        // add new stores here
        
    }

}