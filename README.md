# Angular 2 IndexedDB
> Angular 2 IndexedDB is an implementation experiment of IndexedDB with Entities in the new Angular 2 applications using TypeScript.

## The logic of IndexedDB with Entities
Operations performed using IndexedDB are done asynchronously, so as not to block the rest of an application running. Well. But if we don't insert the data that we read directly into the DOM, just as in the Angular 2 applications, we have a problem: the data are not ready to be rendered by the view when we read or update them.
To solve this problem, we look at the diagram below:
![IndexedDBwithEntities](http://www.seerobertodevelop.net/Content/Images/Blog/IndexedDBwithEntities.jpg)
In the class `IndexedDB` there are the methods to retrieve and modify asynchronously the data into object stores: this methods are standard.
The class `IndexedDB Entities` defines every object store entity, as for example:
```TypeScript
// EXAMPLE TODO
export class Todo {
    todoId: number; // key
    // value {}
    description: string;
}
...
todos: Array<Todo> = []; // todos entity
```
and the own methods to work with the entity, like the addition of an element:
```TypeScript
// add todo
addTodo(record: Todo) {
    var todo: Todo = new Todo();
    todo.todoId = record.todoId;
    todo.description = record.description;
    this.todos.push(todo);
}
```
When there is a request, for example the addition of an element, the component calls the asynchronous method of adding an element to the object store, but also calls the same method of adding an element to the entity.
This latter is performed immediately, and can be rendered by the view, while the asynchronous method completes meantime its execution, which will be available at the next event. 
Therefore with the entities we work to a level of abstraction higher, with the data immediately available while the read-write transactions occur on the db.

## Running the sample app
What you need to run this app:
- This repository
- [Node and npm](https://nodejs.org), Bower already installed

In the command-prompt, go to the directory that contains `index.html`:
```
npm install

bower install

npm install -g http-server
http-server
```
and then in a browser, visit `localhost:8080/index.html`.