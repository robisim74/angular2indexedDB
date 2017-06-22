import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services.
import { IndexedDBService } from './services/indexedDB.service'; // IndexedDBService class.
import { Entity, Todo } from './models/entity'; // Entity classes.

import { AppComponent } from './app.component';
import { TodoComponent } from './todo.component';

@Injectable() export class IndexedDB {

    constructor(public indexedDB: IndexedDBService, public entity: Entity) { }

    load(): Promise<void> {

        // Opens the "Angular2IndexedDB" database. If it doesn't exist, it will be created.
        var promise: Promise<any> = new Promise((resolve: any) => {

            this.indexedDB.openDBAsync("Angular2IndexedDB", 1).forEach(

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

                    ).then(() => {

                        resolve(true);
                        console.log('IndexedDB service: obtaining of all records completed.');

                    });

                });

        });

        return promise;

    }

}

export function initIndexedDB(indexedDB: IndexedDB): Function {
    return () => indexedDB.load();
}

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        TodoComponent
    ],
    providers: [
        IndexedDBService,
        Entity,
        IndexedDB,
        {
            provide: APP_INITIALIZER,
            useFactory: initIndexedDB,
            deps: [IndexedDB],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
