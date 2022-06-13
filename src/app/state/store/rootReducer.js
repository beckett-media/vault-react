import { combineReducers } from "@reduxjs/toolkit";
import { interestFormReducers } from "../reducers";

export const initialState = {
        interestForm: {
            first: '', last: '', phone: '', 
            email:'', beckettId:'', checkbox1: false, 
            checkbox2: false, checkbox3: false, 
            checkbox4: false, checkbox5: false, 
            checkbox6: false
        }
    }


export const rootReducer = combineReducers({
    interestForm: interestFormReducers,
})