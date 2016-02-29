# Angular 2 IndexedDB
> IndexedDB in the new Angular 2 applications using TypeScript.

## Sample application
Sample application that uses an `Entity` model to work asynchronously: [demo](http://robisim74.github.io/angular2indexedDB)

## Basic usage
Include in your application:
* the `indexedDB` service;
* the `object-store` model;

and register `IndexedDBService` in your component:
```TypeScript
// Services.
import {IndexedDBService} from './services/indexedDB.service'; // IndexedDBService class.

@Component({
    selector: 'app-component',
    ...
    providers: [IndexedDBService]
})

export class AppComponent {

    constructor(public indexedDB: IndexedDBService) { }
     
}
```
In the `object-store` model, add the object stores:
```TypeScript
createStores(db: IDBDatabase) {

    // Creates "TodoStore".
    var todoStore: IDBObjectStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
    // Add new stores here.
       
}
```

### IndexedDBService methods
Each method can be invoked with the `forEach` method, which accepts a single callback and returns a promise: 
```TypeScript
// Opens the database.
this.indexedDB.openDBAsync(dbName, 1).forEach(
                   
    // Next.
    (readyState: string) => {

        console.log('IndexedDB service: opening db: ' + readyState);

    }, null

);
```

## The sample application
The sample application implements a simple todos list using an `Entity` model to work asyncronously:
![IndexedDBwithEntities](https://github.com/robisim74/angular2indexedDB/blob/master/IndexedDBEntity.jpg)
Plus:
* the service requires only the basic methods: other methods that don't affect the db can be easily implemented and customized on the entity;
* higher speed of execution, as in this example:
```TypeScript
// Edits a todo.
editTodo(record: Todo) {
    
    // Edits the record with the UTC timestamp.
    console.log("Start editing db: " + Date.now() + " milliseconds.");
    this.indexedDB.editRecordAsync("TodoStore", record).forEach(
        
        // Next.
        (readyState) => { console.log('IndexedDB service: editing record: ' + readyState); }, null

    ).then(() => console.log("End editing db: " + Date.now() + " milliseconds."));
    
    // Updates the entity. 
    console.log("Start editing entity: " + Date.now() + " milliseconds.");
    this.entity.editTodo(record);
    console.log("End editing entity: " + Date.now() + " milliseconds.");

}
```
With only three records, the result is the following:
```
Start editing db: 1456475260237 milliseconds.
Start editing entity: 1456475260237 milliseconds.
End editing entity: 1456475260238 milliseconds.
IndexedDB service: editing record: done
End editing db: 1456475260245 milliseconds.
```
The update of the record on the db takes about 8 milliseconds, and can continue during the update of the entity which instead lasts a millisecond.

### Running the sample app
What you need to run the sample app:
- this repository
- [Node and npm](https://nodejs.org), [Bower](http://bower.io/), [tsd](http://definitelytyped.org/) already installed.

In the command line, go to the directory that contains `index.html`:
```
npm install
bower install
tsd install
gulp
```
You need a static server as [lite-server](https://github.com/johnpapa/lite-server):
```
npm install -g lite-server
lite-server
```
and then in a browser visit `localhost:3000/index.html`.