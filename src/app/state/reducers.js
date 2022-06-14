import { initialState } from './store/rootReducer';
import { 
	SET_FIRST, SET_LAST, SET_PHONE, SET_EMAIL, 
	SET_BECKETT_ID, SET_CHECKBOX_6, SET_CHECKBOX_5, 
	SET_CHECKBOX_4, SET_CHECKBOX_3, SET_CHECKBOX_2, 
	SET_CHECKBOX_1, 
	RESET_FORM} from './types';

export const interestFormReducers = (state = {initialState}, action) => {
	console.log('reducer returns ',action.payload)
	switch(action.type){
		case SET_FIRST: 
        console.log(action)
        return { ...state, first: action.payload.interestForm.first}
		case SET_LAST: 
        console.log(action)
        return { ...state, last: action.payload.interestForm.last}
		case SET_PHONE: 
        console.log(action)
        return { ...state, phone: action.payload.interestForm.phone}
		case SET_EMAIL: 
        console.log(action)
        return { ...state, email: action.payload.interestForm.email}
		case SET_BECKETT_ID: 
        console.log(action)
        return { ...state, beckettId: action.payload.interestForm.beckettId}
		case SET_CHECKBOX_1:
        console.log(action)
        return { ...state, checkbox1: action.payload.interestForm.checkbox1}
		case SET_CHECKBOX_2: 
        console.log(action)
        return { ...state, checkbox2: action.payload.interestForm.checkbox2}
		case SET_CHECKBOX_3: 
        console.log(action)
        return { ...state, checkbox3: action.payload.interestForm.checkbox3}
		case SET_CHECKBOX_4: 
        console.log(action)
        return { ...state, checkbox4: action.payload.interestForm.checkbox4}
		case SET_CHECKBOX_5: 
        console.log(action)
        return { ...state, checkbox5: action.payload.interestForm.checkbox5}
		case SET_CHECKBOX_6: 
        console.log(action)
        return { ...state, checkbox6: action.payload.interestForm.checkbox6}
		case RESET_FORM: 
        console.log(action)
        return { ...state, checkbox6: action.payload.interestForm}

		default: return state
	}
}
