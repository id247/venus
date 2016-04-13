import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';


const Sex = React.createClass({

	_setSex: function(e){
		emit(actions.BUTTON_SEX_NEXT_ENABLE);
		emit(actions.SET_SEX, e.target.value);
	},

	_nextPage: function(e){
		e.preventDefault();
		
		emit(actions.SHOW_PAGE, 'quiz');
	},

	render: function() {

		return (
			<div className="app__page">

				<div className="app__content">
					
					<div className="app__sex sex">
						
						<h3 className="sex__title">
							Для начала познакомимся! Ты — юноша или девушка?
						</h3>

						<ul className="sex__list">
							
							<li className="sex__item">
						
								<label className="sex__radio sex-radio sex-radio--boy">
									<input 	type="radio" 
											name="sex" 
											className="sex-radio__input" 
											value="boy" 
											required 
											//defaultChecked={true} 
											onChange={this._setSex}
											/>
									<span className="sex-radio__text">
										Юноша
									</span>
								</label>
						
							</li> 
							
							<li className="sex__item">
						
								<label className="sex__radio sex-radio sex-radio--girl">
									<input 	type="radio" 
											name="sex" 
											className="sex-radio__input" 
											value="girl" 
											required
											onChange={this._setSex}
											/>
									<span className="sex-radio__text">
										Девушка
									</span>
								</label>
						
							</li> 
						
						</ul> 

					</div>

					<div className="app__button-placeholder">
						
						<button className="button button--yellow button--m" 
								onClick={this._nextPage}
								disabled={this.props.buttons.buttonNextDisabled}
								>
						Далее</button>

					</div>

				</div>

			</div>
		);
	}

});

export default Sex;
