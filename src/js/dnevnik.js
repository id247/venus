'use strict'

import app from './app';

const appSettings = {
	server: 'dnevnik.ru',
	groupLink: 'https://groups.dnevnik.ru/group.aspx?group=325643',
	develop: false
}

//start the magic
document.addEventListener('DOMContentLoaded', () => {

	app(appSettings);

});   
