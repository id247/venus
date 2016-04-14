import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

const Greeting = React.createClass({

	_nextPage: function(e){
		e.preventDefault();
		emit(actions.SHOW_PAGE, 'sex');
	},

	render: function() {
		return (
			<div className="app__page">

				<div className="app__content">
					
					<div className="app__text app__text--center text">
						<br/>
						<br/>
						<br/>
						<br/>
						<p>
							Мудрый вожак стаи, кроткая овечка, решительная волчица или волк-балагур&nbsp;&mdash; хочешь знать, на&nbsp;кого из&nbsp;героев нового мультфильма &laquo;<strong>Волки и&nbsp;овцы: бе-е-е-зумное превращение</strong>&raquo; ты&nbsp;больше всего похож?
						</p>
						
						<p>
							Познакомиться поближе с&nbsp;самими персонажами ты&nbsp;сможешь в&nbsp;кино уже <strong>с&nbsp;28&nbsp;апреля 2016&nbsp;года</strong>, а&nbsp;пока пройди тест и&nbsp;узнай, кто ты&nbsp;есть на&nbsp;самом деле!
						</p>

					</div>

					<div className="app__button-placeholder">
						
						<button className="button button--yellow button--m" onClick={this._nextPage}>Пройти тест</button>

					</div>

				</div>

			</div>
		);
	}

});

export default Greeting;
