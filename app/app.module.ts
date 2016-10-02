import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services.
import { IndexedDBService } from './services/indexedDB.service'; // IndexedDBService class.
import { Entity } from './models/entity'; // Entity classes.

import { AppComponent } from './app.component';
import { TodoComponent } from './todo.component';

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
    providers: [IndexedDBService, Entity],
    bootstrap: [AppComponent]
})
export class AppModule { }
