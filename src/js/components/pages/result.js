import React from 'react';
import ReactDOM from 'react-dom';

import { emit } from '../../lib/dispatcher';
import actions from '../../lib/actions';

const Result = React.createClass({

	componentWillMount: function() {
		
	},

	_gotoStart: function(e){
		e.preventDefault();
		emit(actions.SHOW_PAGE, 'quiz');
	},

	_share: function(e){
		e.preventDefault();
		
		emit(actions.PUBLIC_SHARE, e.target.href);
	},

	render: function() {

		let { pers, server, shares } = this.props;

		return (
			<div className="app__page answer" style={{backgroundImage: 'url(' + (server === 'local' ? pers.image : pers.imageRemote) + ')'}}>

				<div className="app__content answer__content">

					<h3 className="app__title answer__title">
						{pers.name}
					</h3>
					
					<div className="app__text answer__text text" dangerouslySetInnerHTML={{__html: pers.text }}>
						

					</div>

					<div className="app__button-placeholder">
						
						<button className="button button--yellow button--m" onClick={this._gotoStart}>Пройти тест еще раз</button>

					</div>

					<div className="app__share share">
						
						<ul className="share__list">

							{shares.map( (share) => (
								<li className="share__item">
						
									<a 	href={share.link} 
										className={('share__href share__href--' + share.id)}
										onClick={this._share}
										>
									</a>
						
								</li> 
							))}
						
						</ul> 

					</div>

				</div>

			</div>
		);
	}

});

export default Result;
