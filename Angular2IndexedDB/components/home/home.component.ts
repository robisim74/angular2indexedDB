import {Component, View} from 'angular2/core';

import {TodoComponent} from '../todo/todo.component';

// Services.
import {IndexedDB} from '../../services/indexedDB'; // IndexedDB class.
// Models.
import {IndexedDBEntities, Todo} from '../../models/indexedDBEntities'; // IndexedDBEntities class & entities.

@Component({
    selector: 'home-component',
    providers: [IndexedDB, IndexedDBEntities] // IndexedDB & Entities providers: inherited by all descendants.
})
@View({
    templateUrl: './components/home/home.component.html',
    directives: [TodoComponent]
})

export class HomeComponent {

    constructor(public indexedDB: IndexedDB, public indexedDBEntities: IndexedDBEntities) { // Injects the instances of IndexedDB & Entities in the constructor.

        // OPENS THE DB ASYNCHRONOUSLY & LOADS DATA INTO ENTITIES
        // DATA WILL BE AVAILABLE ON THE NEXT CHANGE DETECTION
        // @param dbName
        // @param version
        this.indexedDB.dbOpenAsync("appDB", 1, () => { // Callback usage.
            
            // The object stores will be loaded asynchronously.
            // Calls the getAllRecords asynchronous method.
            // @param storeName
            this.indexedDB.getAllRecordsAsync("todoStore", (result: any) => { // Callback usage.
            
                result.forEach((record: Todo) => {

                    // LOADS DATA INTO ENTITIES
                    this.indexedDBEntities.addTodo(record); // Entities getTodo method.

                });

            });
            
            // Add a new call to the getAllRecords asynchronous method here. 

        }); // If the db doesn't exist, it will be created.

    }

}
