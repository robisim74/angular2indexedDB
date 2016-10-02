import { Component } from '@angular/core';
// Services.
import { IndexedDBService } from './services/indexedDB.service'; // IndexedDBService class.
// Models.
import { Entity, Todo } from './models/entity'; // Entity classes.
// Components.
import { TodoComponent } from './todo.component';

@Component({
    selector: 'app-component',
    templateUrl: './app/app.component.html'
})

export class AppComponent {

    constructor(public indexedDB: IndexedDBService, public entity: Entity) {

        // Opens the "Angular2IndexedDB" database. If it doesn't exist, it will be created.
        this.openDB("Angular2IndexedDB");

    }

    openDB(dbName: string) {

        // Opens the database.
        this.indexedDB.openDBAsync(dbName, 1).forEach(

            // Next.
            (readyState: string) => {

                console.log('IndexedDB service: opening db: ' + readyState);

            }, null

        ).then(

            () => {

                // Gets all records from "TodoStore".
                this.indexedDB.getAllRecordsAsync("TodoStore").forEach(

                    // Next.
                    (record: Todo) => {

                        // Adds next record to the Todos entity.
                        if (record != null) {

                            this.entity.addTodo(record);

                        }

                    }, null

                ).then(() => console.log('IndexedDB service: obtaining of all records completed.'))
            }

            );

    }

}
