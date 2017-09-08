// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-santinize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import { Meteor } from 'meteor/meteor';

// Modules

import RoutesConfig from '../routes';

const App = "Whatsapp';

// App

Angular.module(App, [
    'angular-meteor',
    'ionic'
});

new Loader(App)
    .load(RoutesConfig);

// Startup

if (Meteor.isCordova) {
    Angular.element(document).on('deviceready', onReady);
}
else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.boostrap(document, [App]);
}
