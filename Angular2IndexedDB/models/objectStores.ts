/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB with entities in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

/**
 * ObjectStores class.
 * Defines the object stores of the db.
 * 
 * @author Roberto Simonetti
 */
export class ObjectStores {

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
    createStores(db: IDBDatabase) {
          
        // EXAMPLE TODO
        // Create the todo store.
        var todoStore: IDBObjectStore = db.createObjectStore("todoStore", { keyPath: 'todoId' });
        // Add new stores here.
        
    }

}