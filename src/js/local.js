'use strict'

import app from './app';

const appSettings = {
	server: 'local',
	develop: true
}

//start the magic
document.addEventListener('DOMContentLoaded', () => {

	app(appSettings);

});   
