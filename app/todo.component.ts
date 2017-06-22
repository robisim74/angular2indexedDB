import { Component } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
// Services.
import { IndexedDBService } from './services/indexedDB.service';
// Models.
import { Entity, Todo } from './models/entity';

@Component({
    selector: 'todo-component',
    templateUrl: './app/todo.component.html'
})

export class TodoComponent {

    description: string;

    constructor(public indexedDB: IndexedDBService, public entity: Entity) {

        this.description = "";

        this.getTodo();

    }

    getTodo() {

        console.log(this.entity.todos[0]);
        
    }

    // Gets todos.
    get todos(): Observable<Array<Todo>> {

        return new Observable((observer: Observer<Array<Todo>>) => {

            observer.next(this.entity.todos);
            observer.complete();

        });

    }

    // Adds a todo.
    addTodo(description: string) {

        // Creates a new record.
        var record: Todo = new Todo();
        record.todoId = this.entity.createKey();
        record.description = description;

        // Adds the record.
        this.indexedDB.addRecordAsync("TodoStore", record).forEach(

            // Next.
            (readyState) => { console.log('IndexedDB service: adding record: ' + readyState); }, null

        );

        // Updates the entity. 
        this.entity.addTodo(record);

        // Clears description.
        this.description = "";

    }

    // Deletes a todo.
    deleteTodo(record: Todo) {

        // Gets the record key.
        var key: string = record.todoId;

        // Deletes the record.
        this.indexedDB.deleteRecordAsync("TodoStore", key).forEach(

            // Next.
            (readyState) => { console.log('IndexedDB service: deleting record: ' + readyState); }, null

        );

        // Updates the entity. 
        this.entity.deleteTodo(record);

    }

    // Edits a todo.
    editTodo(record: Todo) {

        // Edits the record.
        this.indexedDB.editRecordAsync("TodoStore", record).forEach(

            // Next.
            (readyState) => { console.log('IndexedDB service: editing record: ' + readyState); }, null

        );

        // Updates the entity. 
        this.entity.editTodo(record);

    }

    // Clears the todos.
    clearTodos() {

        // Clears the object store.
        this.indexedDB.clearObjectStoreAsync("TodoStore").forEach(

            // Next.
            (readyState) => { console.log('IndexedDB service: clearing object store: ' + readyState); }, null

        );

        // Updates the entity.       
        this.entity.clearTodos();

    }

    // Sorts by description.
    sortTodos() {

        this.entity.sortTodos();

    }

}
