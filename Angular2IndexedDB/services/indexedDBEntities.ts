// ANGULAR 2 INDEXEDDB
// indexedDB with entities in the angular 2 applications using typescript 
// written by roberto simonetti
// MIT license
// https://github.com/robisim74/angular2indexedDB

// IndexedDBEntities class
// define object stores entities & own methods

import {Injectable} from 'angular2/angular2';

// define every object store entity
// EXAMPLE TODO
export class Todo {
    todoId: number; // key
    // value {}
    description: string;
}
// add a new entity here

@Injectable() export class IndexedDBEntities {
	
	// OBJECT STORES ENTITIES as arrays
	// EXAMPLE TODO
	todos: Array<Todo> = []; // todos entity
	// add new entity here
	
	// ENTITIES METHODS
	// EXAMPLE TODO
	// get todo
	getTodo(element: any) {

		var todo: Todo = new Todo();
		todo.todoId = element.todoId;
		todo.description = element.description;

		this.todos.push(todo);

	}
	// add todo
	addTodo(record: Todo) {

		var todo: Todo = new Todo();
		todo.todoId = record.todoId;
		todo.description = record.description;

		this.todos.push(todo);

	}
	// example of key
	createKey() {
		
		// find max key
		var key: number = 0;
		this.todos.forEach((todo: Todo) => {

			if (todo.todoId > key) { key = todo.todoId }

		})

		return (key + 1);

	}
	// delete todo	
	deleteTodo(todo: Todo) {

		var index: number = this.todos.indexOf(todo);
		this.todos.splice(index, 1);

	}
	// clear todos
	clearTodos() {

		this.todos.splice(0);

	}

}
