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

export class AppComponent { }
