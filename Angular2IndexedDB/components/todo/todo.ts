import {Component, View, NgFor} from 'angular2/angular2';

// services
import {IndexedDB} from '../../services/indexedDB'; // IndexedDB class
import {IndexedDBEntities, Todo} from '../../services/indexedDBEntities'; // IndexedDBEntities class & entities

@Component({
    selector: 'todo'
})
@View({
    templateUrl: './components/todo/todo.html',
    directives: [NgFor]
})

export class todo {

    constructor(public indexedDB: IndexedDB, public indexedDBEntities: IndexedDBEntities) { // inject instances of IndexedDB & Entities in the constructor
    }

    // list of todos
    todos() {

        return this.indexedDBEntities.todos;

    }
    
    // add a todo
    addTodo(description: string) {
       
        // UPDATE INDEXEDDB ASYNCHRONOUSLY
        // record: key & value of object store
        var record: Todo =new Todo();
        record.todoId = this.indexedDBEntities.createKey();
        record.description=description;       
        // call addRecord asynchronous method
        // @param {string} storeName
        // @param {any} record
        this.indexedDB.addRecordAsync("todoStore", record);
        
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.addTodo(record); // entities addTodo method

    }
    
    // delete a todo
    deleteTodo(todo: Todo) {
               
        // UPDATE INDEXEDDB ASYNCHRONOUSLY
        var key: number = todo.todoId;      
        // call deleteRecord asynchronous method
        // @param {string} storeName
        // @param {any} key
        this.indexedDB.deleteRecordAsync("todoStore", key);
        
        // UPDATE ENTITIES NOW
        this.indexedDBEntities.deleteTodo(todo); // entities deleteTodo method
        
    }
    
    // clear todos
    clearTodos() {
        
        // UPDATE INDEXEDDB ASYNCHRONOUSLY     
        // call clearObjectStore asynchronous method
        // @param {string} storeName
        this.indexedDB.clearObjectStoreAsync("todoStore");
        
        // UPDATE ENTITIES NOW       
        this.indexedDBEntities.clearTodos(); // entities clearTodos method
        
    }

}