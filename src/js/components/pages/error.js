import React from 'react';
import ReactDOM from 'react-dom';

const ErrorPage = React.createClass({

	render: function() {
		return (
			<div className="app__page">

				<div className="app__content">
					
					<div className="app__text app__text--center text">
						
						<p>
							К сожалению, произошла непредвиденная ошибка :'/	
						</p>

					</div>

				</div>

			</div>
		);
	}

});

export default ErrorPage;
