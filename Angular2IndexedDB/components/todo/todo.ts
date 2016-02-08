import {Component, View} from 'angular2/core';

// Services.
import {IndexedDB} from '../../services/indexedDB'; // IndexedDB class.
import {IndexedDBEntities, Todo} from '../../services/indexedDBEntities'; // IndexedDBEntities class & entities.

@Component({
    selector: 'todo'
})
@View({
    templateUrl: './components/todo/todo.html'
})

export class todo {

    constructor(public indexedDB: IndexedDB, public indexedDBEntities: IndexedDBEntities) { // Injects the instances of IndexedDB & Entities in the constructor.
    }

    // List of the todos.
    todos() {

        return this.indexedDBEntities.todos;

    }
    
    // Adds a todo.
    addTodo(description: string) {
       
        // UPDATES INDEXEDDB ASYNCHRONOUSLY
        // record: key & value of the object store.
        var record: Todo = new Todo();
        record.todoId = this.indexedDBEntities.createKey();
        record.description = description;       
        // Calls the addRecord asynchronous method.
        // @param storeName
        // @param record
        this.indexedDB.addRecordAsync("todoStore", record);
        
        // UPDATES ENTITIES NOW
        this.indexedDBEntities.addTodo(record); // Entities addTodo method.

    }
    
    // Deletes a todo.
    deleteTodo(record: Todo) {
               
        // UPDATES INDEXEDDB ASYNCHRONOUSLY
        var key: number = record.todoId;      
        // Calls the deleteRecord asynchronous method.
        // @param storeName
        // @param key
        this.indexedDB.deleteRecordAsync("todoStore", key);
        
        // UPDATES ENTITIES NOW
        this.indexedDBEntities.deleteTodo(record); // Entities deleteTodo method.
        
    }
    
    // Edits a todo.
    editTodo(record: Todo) {
               
        // UPDATES INDEXEDDB ASYNCHRONOUSLY 
        // Calls the editRecord asynchronous method.
        // @param storeName
        // @param record
        this.indexedDB.editRecordAsync("todoStore", record);
        
        // UPDATES ENTITIES NOW
        this.indexedDBEntities.editTodo(record); // Entities editTodo method.
        
    }
    
    // Clears the todos.
    clearTodos() {
        
        // UPDATES INDEXEDDB ASYNCHRONOUSLY     
        // Calls the clearObjectStore asynchronous method.
        // @param storeName
        this.indexedDB.clearObjectStoreAsync("todoStore");
        
        // UPDATES ENTITIES NOW       
        this.indexedDBEntities.clearTodos(); // Entities clearTodos method.
        
    }

}