'use strict'

import app from './app';

const appSettings = {
	server: 'dnevnik.ru',
	develop: false
}

//start the magic
document.addEventListener('DOMContentLoaded', () => {

	app(appSettings);

});   
