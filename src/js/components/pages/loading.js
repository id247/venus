import React from 'react';
import ReactDOM from 'react-dom';

const Loading = React.createClass({

	render: function() {
		return (
			<div className="app__page">
			
				<div className="app__loader" onClick={this._click}></div>

			</div>
		);
	}

});

export default Loading;
