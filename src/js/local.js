'use strict'

import app from './app';

const appSettings = {
	server: 'local',
	groupLink: 'https://groups.dnevnik.ru/group.aspx?group=325643',
	develop: true
}

//start the magic
document.addEventListener('DOMContentLoaded', () => {

	app(appSettings);

});   
