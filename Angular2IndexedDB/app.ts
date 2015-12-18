import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {home} from './components/home/home';

@Component({
    selector: 'app'
})
@View({
    templateUrl: './app.html',
    directives: [home]
})

class app {
}

bootstrap(app);