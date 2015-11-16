// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB

// IndexedDB class
// db operations

// dependencies:
// - angular: v2.0.0-alpha.46

import {Injectable} from 'angular2/angular2';

import {ObjectStores} from './objectStores';

@Injectable() export class IndexedDB {

    db: IDBDatabase; // local db

    constructor() { }

    // open the database
    dbOpenAsync(dbName: string, version: number, callback: () => void) {

        // specify the name and version
        var request: IDBOpenDBRequest = indexedDB.open(dbName, version);

        // success
        request.onsuccess = (event) => {

            this.db = (<IDBOpenDBRequest>event.target).result;
            console.log("dbOpen:", (<IDBOpenDBRequest>event.target).readyState)

            callback();

        };        
        // error
        request.onerror = (event) => {

            console.error("dbOpen:", (<IDBOpenDBRequest>event.target).error.name);

        };

        request.onupgradeneeded = (event) => {

            // the db doesn't exist, so crete object stores
            this.db = (<IDBOpenDBRequest>event.target).result;;
            
            // instantiate Object Stores class
            // and call create stores method
            var objectStores: ObjectStores = new ObjectStores();
            objectStores.createStores(this.db);

        };

    }
    
    // get object store
    getObjectStore(name: string, mode: string) {

        var tx: IDBTransaction = this.db.transaction(name, mode);
        return tx.objectStore(name);

    }
    
    // indexedDB methods
    // get all records
    getAllRecordsAsync(storeName: string, callback: (result: any) => void) { // callback typing

        var result: any = []; // return records into an array

        var store: IDBObjectStore = this.getObjectStore(storeName, "readonly"); // get store

        var request: IDBRequest = store.openCursor();
        
        // success
        request.onsuccess = (event) => {

            var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;

            if (cursor) {

                result.push(cursor.value);
                cursor.continue();

            }
            else {

                console.log("getAllRecords:", (<IDBRequest>event.target).readyState)

                callback(result); // on success, call callback and pass result
                
            }

        }
        // error
        request.onerror = (event) => {

            console.error("getAllRecords:", (<IDBRequest>event.target).error.name);

        }

    }
    // add a record
    addRecordAsync(storeName: string, record: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // get store
        
        var request: IDBRequest = store.add(record); // add a new record
        
        // success
        request.onsuccess = (event) => {

            console.log("addRecord:", (<IDBRequest>event.target).readyState)

        }
        // error
        request.onerror = (event) => {

            console.error("addRecord:", (<IDBRequest>event.target).error.name);

        }

    }   
    // delete a record
    deleteRecordAsync(storeName: string, key: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // get store

        var request: IDBRequest = store.delete(key); // delete record by key
        
        // success
        request.onsuccess = (event) => {

            console.log("deleteRecord:", (<IDBRequest>event.target).readyState)

        }
        // error
        request.onerror = (event) => {

            console.error("deleteRecord:", (<IDBRequest>event.target).error.name);

        }

    }
    // edit a record
    editRecordAsync(storeName: string, record: any) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // get store
        
        var request: IDBRequest = store.put(record); // put updated record back into the database
        
        // success
        request.onsuccess = (event) => {

            console.log("editRecord:", (<IDBRequest>event.target).readyState)

        }
        // error
        request.onerror = (event) => {

            console.error("editRecord:", (<IDBRequest>event.target).error.name);

        }

    }  
    // clear an object store
    clearObjectStoreAsync(storeName: string) {

        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite"); // get store
        
        var request: IDBRequest = store.clear(); // clear object store
        
        // success
        request.onsuccess = (event) => {

            console.log("clearObjectStore:", (<IDBRequest>event.target).readyState)

        }
        // error
        request.onerror = (event) => {

            console.error("clearObjectStore:", (<IDBRequest>event.target).error.name);

        }

    }

}
