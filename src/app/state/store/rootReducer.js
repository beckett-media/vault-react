import { combineReducers } from "@reduxjs/toolkit";
import { formReducers } from "../reducers";

export const initialState = {
        form: {title: 'Static'}
    }


export const rootReducer = combineReducers({
    title: formReducers
})