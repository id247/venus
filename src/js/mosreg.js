'use strict'

import app from './app';

const appSettings = {
	server: 'school.mosreg.ru',
	develop: false,
	ddd: false,
}


document.addEventListener('DOMContentLoaded', function() {

	app(appSettings);

});  

