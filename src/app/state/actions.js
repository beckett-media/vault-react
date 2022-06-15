import {
    SET_FIRST,
    SET_LAST,
    SET_PHONE,
    SET_EMAIL,
    SET_BECKETT_ID,
    SET_CHECKBOX_6,
    SET_CHECKBOX_5,
    SET_CHECKBOX_4,
    SET_CHECKBOX_3,
    SET_CHECKBOX_2,
    SET_CHECKBOX_1,
    RESET_FORM,
} from './types'

export const setFirst = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_FIRST,
        payload: payload,
    }
}
export const setLast = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_LAST,
        payload: payload,
    }
}
export const setPhone = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_PHONE,
        payload: payload,
    }
}
export const setEmail = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_EMAIL,
        payload: payload,
    }
}
export const setBeckettId = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_BECKETT_ID,
        payload: payload,
    }
}
export const setCheckbox1 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_1,
        payload: payload,
    }
}
export const setCheckbox2 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_2,
        payload: payload,
    }
}
export const setCheckbox3 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_3,
        payload: payload,
    }
}
export const setCheckbox4 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_4,
        payload: payload,
    }
}
export const setCheckbox5 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_5,
        payload: payload,
    }
}
export const setCheckbox6 = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: SET_CHECKBOX_6,
        payload: payload,
    }
}

export const resetForm = payload => {
    console.log('payload is', payload.interestForm)
    return {
        type: RESET_FORM,
        payload: payload,
    }
}
