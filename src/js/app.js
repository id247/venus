'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { emit } from './lib/dispatcher';
import actions from './lib/actions';
import { getState, addChangeListener } from './stores/store';

//pages
import Loading from './components/pages/loading';
import Greeting from './components/pages/greeting';
import ErrorPage from './components/pages/error';
import Quiz from './components/pages/quiz';
import Result from './components/pages/result';
import Sex from './components/pages/sex';

import 'babel-polyfill';

const app = (settings) => {

	const App = React.createClass({
		getInitialState() {

			return getState();
		},
		componentDidMount() {

			addChangeListener(this._update);

			emit(actions.SET_SETTINGS, {
				settings: this.props.settings,
				page: 'greeting'			
			});
		},
		_update() {

			this.setState(getState());
		},
		render() {

			console.log('RENDER');

			let page;

			switch(this.state.page){
				case 'greeting': page = <Greeting />; 
					break;

				case 'sex': page = <Sex buttons={this.state.buttons} 	
										/>; 
					break;

				case 'quiz': page = <Quiz 	questions={this.state.questions[this.state.sex]} 
											step={this.state.quiz.step} 
											/>; 
					break;

				case 'result': page = <Result 	pers={this.state.pers}
												server={this.state.settings.server}
												shares={this.state.shares}
												/>; 
					break;

				default: page = <ErrorPage />;
			}

			return (
				<div>
					{page}
					<Loading show={this.state.loading} />
				</div>
			)
		}
	});

	ReactDOM.render(
		<App 	settings={settings} 
		/>, 
		document.getElementById('app')
	);

};

export default app;
