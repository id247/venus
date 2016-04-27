'use strict'

import app from './app';

const appSettings = {
	server: 'school.mosreg.ru',
	groupLink: 'https://groups.school.mosreg.ru/group.aspx?group=318754',
	develop: false,
}


document.addEventListener('DOMContentLoaded', function() {

	app(appSettings);

});  

