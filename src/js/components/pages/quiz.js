import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

import { shuffle } from '../../lib/helpers';

const Quiz = React.createClass({

	componentDidMount: function() {
		
	},

	_answer: function(e){
		e.preventDefault();

		const answer = e.target.elements.answer.value;
		emit(actions.QUIZ_NEXT_STEP, answer);
	},

	render: function() {

		const { questions, step } = this.props;

		return (
			<div className="app__page">

				<div className="app__content">

					<form action="#" onSubmit={this._answer}>
					
						<div className="app__question question">
							
							<h3 className="question__title">
								{questions[step].question}
							</h3>

							<ul className="question__list">

								{shuffle(questions[step].answers).map( (answer, index) => (
									<li className="question__item" key={(step + '-' + index)}>
							
										<label className="radio">
											<input 	type="radio" 
													name="answer"
													className="radio__input" 
													value={answer.id} 
													required 
													defaultChecked={Boolean(index === 0)} 
													//onChange={this._setAnswer}
													/>
											<span className="radio__text">
												{answer.text}
											</span>
										</label>
							
									</li> 
								))}
							
							</ul> 

						</div>

						<div className="app__button-placeholder">
							
							<button type="submit" className="button button--yellow button--m">Далее</button>

						</div>

					</form>

				</div>

			</div>
		);
	}

});

export default Quiz;
