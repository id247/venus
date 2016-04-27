import React from 'react';
import ReactDOM from 'react-dom';

import ReactSlider from '../lib/react-slider';

//const Slider = React.createClass({

	//React.initializeTouchEvents(true);

//	var ReactSlider = React.createFactory(ReactSlider);

	// function map(v, f, context) {
	// 	return (v && v.map) ? v.map(f, context) : f.call(context, v, 0);
	// }

	var Slider = React.createClass({
		// getInitialState: function () {
		// 	return { value: this.props.defaultValue }
		// },

		// onChange: function(value) {
		// 	this.setState({ value: value });
		// },

		render() {
			return (
				<ReactSlider 
					defaultValue={12} 
					pearling={true} 
					min={12} 
					max={18}
					className="slider"
					handleClassName="slider__handle" 
					/>
			);
		}
	});

//});

export default Slider;
