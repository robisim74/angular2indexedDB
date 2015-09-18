import {Component, View, NgIf} from 'angular2/angular2';

import {todo} from '../todo/todo';

// services
import {IndexedDB} from '../../services/indexedDB'; // IndexedDB class
import {IndexedDBEntities, Todo} from '../../services/indexedDBEntities'; // IndexedDBEntities class & entities

@Component({
    selector: 'home',
    bindings: [IndexedDB, IndexedDBEntities] // IndexedDB & Entities binding: inherited by all descendants
})
@View({
    templateUrl: './components/home/home.html',
    directives: [todo, NgIf]
})

export class home {

    constructor(public indexedDB: IndexedDB, public indexedDBEntities: IndexedDBEntities) { // inject instances of IndexedDB & Entities in the constructor

        // OPEN DB ASYNCHRONOUSLY & LOAD DATA INTO ENTITIES
        // DATA WILL BE AVAILABLE ON NEXT CHANGE DETECTION
        // @param {string} dbName
        // @param {number} version
        this.indexedDB.dbOpenAsync("appDB", 1, () => { // callback usage
            
            // the object stores will be loaded asynchronously
            // call getAllRecords asynchronous method
            // @param {string} storeName
            this.indexedDB.getAllRecordsAsync("todoStore", (result: any) => { // callback usage
            
                result.forEach((element: Todo) => {

                    // LOAD DATA INTO ENTITIES
                    this.indexedDBEntities.getTodo(element); // entities getTodo method

                });

            });
            
            // add new call getAllRecords asynchronous method here 

        }); // if the db doesn't exist, it will be created

    }

}
