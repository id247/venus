import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';


const Sex = React.createClass({

	_enableButton: function(e){
		emit(actions.BUTTON_SEX_NEXT_ENABLE);
	},

	_nextPage: function(e){
		e.preventDefault();
		
		let sex;

		[].forEach.call(e.target.elements.sex, (element) => {
			if (element.checked == true) {
				sex = element.value;
			}
		})

		emit(actions.SET_SEX, sex);
		emit(actions.SHOW_PAGE, 'quiz');
	},

	render: function() {

		return (
			<div className="app__page">

				<div className="app__content">

					<form action="#" onSubmit={this._nextPage}>

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
												onChange={this._enableButton}
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
												onChange={this._enableButton}
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
									disabled={this.props.buttons.buttonNextDisabled}
									>
							Далее</button>

						</div>

					</form>
					

				</div>

			</div>
		);
	}

});

export default Sex;
