'use strict'

import app from './app';

const appSettings = {
	server: 'school.mosreg.ru',
	develop: false
}


//start the magic
document.addEventListener('DOMContentLoaded', function() {

	app(appSettings);

});  

