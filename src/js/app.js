'use strict';

import React from 'react';
import { render } from 'react-dom';
import { emit } from './lib/dispatcher';
import { SHOW_MSG, HIDE_MSG, FETCH_MSG } from './lib/actions';
import { getState, addChangeListener } from './stores/store';

//import 'babel-polyfill';

const app = (settings) => {

	const App = React.createClass({
		getInitialState() {

			return getState();
		},
		componentDidMount() {

			addChangeListener(this._update);
		},
		_update() {

			this.setState(getState());
		},
		_fetch() {

			emit(FETCH_MSG);
		},
		render() {

			console.log('RENDER');

			return (

				<div>
					<button onClick={this._toggleSidebar}>_toggleSidebar</button>
				</div>
			)
		}
	});

	render(<App settings={settings} />, document.getElementById('app'));

};

export default app;
