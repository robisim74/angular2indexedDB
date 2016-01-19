import {Component, View} from 'angular2/core';

import {todo} from '../todo/todo';

// services
import {IndexedDB} from '../../services/indexedDB'; // IndexedDB class
import {IndexedDBEntities, Todo} from '../../services/indexedDBEntities'; // IndexedDBEntities class & entities

@Component({
    selector: 'home',
    providers: [IndexedDB, IndexedDBEntities] // IndexedDB & Entities providers: inherited by all descendants
})
@View({
    templateUrl: './components/home/home.html',
    directives: [todo]
})

export class home {

    constructor(public indexedDB: IndexedDB, public indexedDBEntities: IndexedDBEntities) { // inject instances of IndexedDB & Entities in the constructor

        // OPEN DB ASYNCHRONOUSLY & LOAD DATA INTO ENTITIES
        // DATA WILL BE AVAILABLE ON NEXT CHANGE DETECTION
        // @param dbName
        // @param version
        this.indexedDB.dbOpenAsync("appDB", 1, () => { // callback usage
            
            // the object stores will be loaded asynchronously
            // call getAllRecords asynchronous method
            // @param storeName
            this.indexedDB.getAllRecordsAsync("todoStore", (result: any) => { // callback usage
            
                result.forEach((record: Todo) => {

                    // LOAD DATA INTO ENTITIES
                    this.indexedDBEntities.getTodo(record); // entities getTodo method

                });

            });
            
            // add new call getAllRecords asynchronous method here 

        }); // if the db doesn't exist, it will be created

    }

}
