/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB with entities in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

import {Injectable} from 'angular2/core';

import {ObjectStores} from './objectStores';

/**
 * IndexedDB class: db operations.
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class IndexedDB {

    db: IDBDatabase; // Local db.

    constructor() { }

    /**
     * Open the database.
     * 
     * @param dbName
     * @param version
     */
    dbOpenAsync(dbName: string, version: number, callback: () => void) {

        // Specifies name and version.
        var request: IDBOpenDBRequest = indexedDB.open(dbName, version);

        // Success.
        request.onsuccess = (event) => {

            this.db = (<IDBOpenDBRequest>event.target).result;
            console.log("dbOpen:", (<IDBOpenDBRequest>event.target).readyState)

            callback();

        };        
        // Error.
        request.onerror = (event) => {

            console.error("dbOpen:", (<IDBOpenDBRequest>event.target).error.name);

        };

        request.onupgradeneeded = (event) => {

            // The db doesn't exist, so crete the object stores.
            this.db = (<IDBOpenDBRequest>event.target).result;;
            
            // Instantiates the ObjectStores class and call the createStores method.
            var objectStores: ObjectStores = new ObjectStores();
            objectStores.createStores(this.db);

        };

    }

    /**
     * Gets the object store.
     * 
     * @param name
     * @param mode
     * @return The object store
     */
    private getObjectStore(name: string, mode: string) {

        var tx: IDBTransaction = this.db.transaction(name, mode);
        return tx.objectStore(name);

    }
    
    /**
     * Gets all records.
     * 
     * @param storeName The object store name
     */
    getAllRecordsAsync(storeName: string, callback: (result: any) => void) { // Callback typing.

        var result: any = []; // Return the records into an array.

        var store: IDBObjectStore = this.getObjectStore(storeName, "readonly"); // Gets the store.

        var request: IDBRequest = store.openCursor();
        
        // Success.
        request.onsuccess = (event) => {

            var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;

            if (cursor) {

                result.push(cursor.value);
                cursor.continue();

            }
            else {

                console.log("getAllRecords:", (<IDBRequest>event.target).readyState)

                callback(result); // On success, calls callback and pass result.
                
            }

        }
        // Error.
        request.onerror = (event) => {

            console.error("getAllRecords:", (<IDBRequest>event.target).error.name);

        }

    }
    /**
     * Adds a record.
     * 
     * @param storeName The object store name
     * @param record The record to add
     */
    addRecordAsync(storeName: string, record: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // Gets the store.
        
        var request: IDBRequest = store.add(record); // Adds a new record.
        
        // Success.
        request.onsuccess = (event) => {

            console.log("addRecord:", (<IDBRequest>event.target).readyState)

        }
        // Error.
        request.onerror = (event) => {

            console.error("addRecord:", (<IDBRequest>event.target).error.name);

        }

    }
    /**
     * Deletes a record.
     * 
     * @param storeName The object store name
     * @param key The key of the record to delete
     */
    deleteRecordAsync(storeName: string, key: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // Gets the store.

        var request: IDBRequest = store.delete(key); // Deletes the record by the key.
        
        // Success.
        request.onsuccess = (event) => {

            console.log("deleteRecord:", (<IDBRequest>event.target).readyState)

        }
        // Error.
        request.onerror = (event) => {

            console.error("deleteRecord:", (<IDBRequest>event.target).error.name);

        }

    }
    /**
     * Edits a record.
     * 
     * @param storeName The object store name
     * @param record The record to update
     */
    editRecordAsync(storeName: string, record: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // Gets the store.
        
        var request: IDBRequest = store.put(record); // Puts the updated record back into the database.
        
        // Success.
        request.onsuccess = (event) => {

            console.log("editRecord:", (<IDBRequest>event.target).readyState)

        }
        // Error.
        request.onerror = (event) => {

            console.error("editRecord:", (<IDBRequest>event.target).error.name);

        }

    }  
    /**
     * Clears an object store.
     * 
     * @param storeName The object store name
     */
    clearObjectStoreAsync(storeName: string) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // Gets the store.
        
        var request: IDBRequest = store.clear(); // Clears the object store.
        
        // Success.
        request.onsuccess = (event) => {

            console.log("clearObjectStore:", (<IDBRequest>event.target).readyState)

        }
        // Error.
        request.onerror = (event) => {

            console.error("clearObjectStore:", (<IDBRequest>event.target).error.name);

        }

    }

}
