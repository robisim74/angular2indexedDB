import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {HomeComponent} from './components/home/home.component';

@Component({
    selector: 'app-component'
})
@View({
    templateUrl: './app.component.html',
    directives: [HomeComponent]
})

class AppComponent {
}

bootstrap(AppComponent);