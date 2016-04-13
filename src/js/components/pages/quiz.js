import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';


const Quiz = React.createClass({

	_answer: function(){
		emit(actions.QUIZ_NEXT_STEP);
	},

	render: function() {

		const {questions, step } = this.props;

		return (
			<div className="app__page">

				<div className="app__content">
					
					<div className="app__question question">
						
						<h3 className="question__title">
							{questions[step].question}
						</h3>

						<ul className="question__list">

							{questions[step].answers.map((answer, index) => (
								<li className="question__item" key={(step + '-' + index)}>
						
									<label className="radio">
										<input 	type="radio" 
												name={('question' + step)} 
												className="radio__input" 
												value="1" 
												required 
												defaultChecked={Boolean(index === 0)} 
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
						
						<button className="button button--yellow button--m" onClick={this._answer}>Далее</button>

					</div>

				</div>

			</div>
		);
	}

});

export default Quiz;
