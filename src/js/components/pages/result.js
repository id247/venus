import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

const Result = React.createClass({

	_gotoStart: function(e){
		e.preventDefault();
		emit(actions.SHOW_PAGE, 'quiz');
	},

	render: function() {

		const { result } = this.props;

		return (
			<div className="app__page answer" style={{backgroundImage: 'url(../assets/images/pers/' + result.image + '.jpg)'}}>

				<div className="app__content answer__content">

					<h3 className="app__title answer__title">
						{result.name}
					</h3>
					
					<div className="app__text answer__text text" dangerouslySetInnerHTML={{__html: result.text }}>
						

					</div>

					<div className="app__button-placeholder">
						
						<button className="button button--yellow button--m" onClick={this._gotoStart}>Пройти тест еще раз</button>

					</div>

					<div className="app__share share">
						
						<ul className="share__list">
							
							<li className="share__item">
						
								<a href="#" className="share__href share__href--ok"></a>
						
							</li> 
							
							<li className="share__item">
						
								<a href="#" className="share__href share__href--fb"></a>
						
							</li> 
							
							<li className="share__item">
						
								<a href="#" className="share__href share__href--vk"></a>
						
							</li> 
						
						</ul> 

					</div>

				</div>

			</div>
		);
	}

});

export default Result;
