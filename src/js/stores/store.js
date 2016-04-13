import { listen, emit } from '../lib/dispatcher';
import actions from '../lib/actions';

//settings
import questions from '../settings/questions';
import results from '../settings/results';

let state = {
	page: 'greeting',
	quiz: {
		step : 0,
		result : 0,
		questionsCount: 0,	
	},
	sex: 'boy',
	questions: questions,
	results: results,
	settings: {},
	buttons: {
		buttonNextDisabled: true
	}
};

const listeners = [];

export function getState() {

	return state;
}

export function addChangeListener(fn) {

	listeners.push(fn);
}

function updateState(data){
	state = Object.assign({}, state, data);
	
}

function notify() {
	listeners.forEach((fn) => fn());
}

//settings
listen(actions.SET_SETTINGS, (settings) => {
	updateState(settings);	
	notify();
});


//UI elements
listen(actions.BUTTON_SEX_NEXT_ENABLE, (sex) => {
	updateState({
		buttons: Object.assign({}, state.buttons, {
			buttonNextDisabled: false
		})
	});	
	notify();
});


//sex
listen(actions.SET_SEX, (sex) => {
	
	updateState({
		sex: sex,
		quiz: Object.assign({}, state.quiz, {
			questionsCount: state.questions[sex].length
		})
	});

	notify();
});


//routing
listen(actions.SHOW_PAGE, (page) => {
	if (page === 'quiz'){
		emit(actions.QUIZ_START);
	}
	updateState({page: page});	
	notify();
});


//quiz
listen(actions.QUIZ_START, () => {
	updateState({
		quiz: Object.assign({}, state.quiz,{
			step: 0,
		})
	});	
});

listen(actions.QUIZ_NEXT_STEP, () => {

	if (state.quiz.step === state.quiz.questionsCount - 1){
		emit(actions.SHOW_PAGE, 'result');
	}else{
		updateState({
			quiz: Object.assign({}, state.quiz,{
				step: state.quiz.step + 1
			})
		});	
		notify();
	}
	
});



