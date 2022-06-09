import { initialState } from './store/rootReducer';
import { SET_TITLE } from './types';

export const formReducers = (state = {initialState}, action) => {
	console.log('reducer returns ',action.payload)
	switch(action.type){
		case SET_TITLE: 
        console.log(action)
        return { ...state, title: action.payload.form.title}
		
		default: return state
	}
}
