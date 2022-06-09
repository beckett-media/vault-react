import { SET_TITLE } from "./types";

export const setTitle = (payload) => {
    console.log('payload is ', payload)
	return {
		type: SET_TITLE,
        payload: payload
	}
}