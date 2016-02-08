/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB with entities in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

import {Injectable} from 'angular2/core';

// Defines the every object store entity.
// EXAMPLE TODO
export class Todo {
    todoId: number; // Key.
    // Value {}.
    description: string;
}
// Add a new entity here.

/**
 * IndexedDBEntities class.
 * Defines the object stores entities & own methods.
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class IndexedDBEntities {
	
    // OBJECT STORES ENTITIES
    // EXAMPLE TODO
    todos: Array<Todo> = []; // Todos entity.
    // Add a new entity here.
	
    // ENTITIES METHODS
    // EXAMPLE TODO
    // Adds a todo.
    addTodo(record: Todo) {

        this.todos.push(record);

    }
    // Example of key.
    createKey() {
		
        // Finds the max key.
        var key: number = 0;
        this.todos.forEach((todo: Todo) => {

            if (todo.todoId > key) { key = todo.todoId }

        })

        return (key + 1);

    }
    // Deletes a todo.	
    deleteTodo(record: Todo) {

        var index: number = this.todos.indexOf(record);
        this.todos.splice(index, 1);

    }
    // Edits a todo.	
    editTodo(record: Todo) {

        var index: number = this.todos.indexOf(record);
        this.todos[index].todoId = record.todoId;
        this.todos[index].description = record.description;

    }
    // Clears the todos.
    clearTodos() {

        this.todos.splice(0);

    }

}
