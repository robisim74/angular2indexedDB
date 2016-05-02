# Angular 2 IndexedDB
> IndexedDB in the new Angular 2 applications using TypeScript.

## Sample app
The sample application implements a simple todos list using an `Entity` model to work asyncronously:
![IndexedDBEntity](https://github.com/robisim74/angular2indexedDB/blob/master/IndexedDBEntity.jpg)
Plus:
* the service requires only the basic methods: other methods that don't affect the db can be easily implemented and customized on the entity;
* higher speed of execution.

## Running the sample app
What you need to run the sample app:
- this repository
- [Node and npm](https://nodejs.org), [Bower](http://bower.io/), [tsd](http://definitelytyped.org/) already installed.

In the command line, go to the directory that contains `index.html`:
```
npm install
bower install
tsd install
```
You need a static server as [lite-server](https://github.com/johnpapa/lite-server):
```
npm install -g lite-server
lite-server
```
and then in a browser visit `localhost:3000/index.html`.