/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

/**
 * ObjectStore class.
 * Defines the object stores of the database.
 * The object stores are the primary storage mechanism for storing data in the database.
 * https://w3c.github.io/IndexedDB/
 * 
 * @author Roberto Simonetti
 */
export class ObjectStore {

    /**
     * Creates the object stores.
     * The object store has a list of records which hold the data stored in the object store.
     * Each record consists of a key and a value.
     * 
     * @param db The database
     */
    createStores(db: IDBDatabase) {

        // Creates "TodoStore".
        var todoStore: IDBObjectStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
        // Add new stores here.
        
    }

}