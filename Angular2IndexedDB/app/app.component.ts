import {Component, View} from 'angular2/core';

import {HomeComponent} from './home/home.component';

@Component({
    selector: 'app-component'
})
@View({
    templateUrl: './app/app.component.html',
    directives: [HomeComponent]
})

export class AppComponent {
}
