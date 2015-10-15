import {Component, View, bootstrap} from 'angular2/angular2';

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