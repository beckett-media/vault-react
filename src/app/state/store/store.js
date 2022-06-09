import { initialState, rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { formReducers } from "../reducers";

export const store = configureStore({
    reducer: {
       form: formReducers
    },
    preloadedState: {form: initialState.form}
    
});