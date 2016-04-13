import { listen, emit } from '../lib/dispatcher';
import actions from '../lib/actions';

let state = {
	open: false,
	message: ''
};

const listeners = [];

function updateState(data){
	state = Object.assign({}, state, data);
	notify();
}

export function getState() {

	return state;
}

export function addChangeListener(fn) {

	listeners.push(fn);
}

function notify() {

	listeners.forEach((fn) => fn());
}

listen(actions.SHOW_MSG, () => {
	updateState({open: true});	
});
