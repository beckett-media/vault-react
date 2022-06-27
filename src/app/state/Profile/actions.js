import { SET_PROFILE_BILL_ADDRESS, SET_PROFILE_BILL_CITY, SET_PROFILE_BILL_STATE, SET_PROFILE_BILL_ZIPCODE, SET_PROFILE_SHIP_ZIPCODE } from "./types";

export const setProfileForm = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type: SET_PROFILE_FORM,
    payload: payload,
  };
}
export const setProfileLastName = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type: SET_PROFILE_LAST_NAME,
    payload: payload,
  };
};
export const setProfileFirstName = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_FIRST_NAME,
    payload: payload,
  }
}
export const setProfilePrimaryPhone = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_PRIMARY_PHONE,
    payload: payload,
  };
};
export const setProfileSecondaryPhone = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type: SET_PROFILE_SECONDARY_PHONE,
    payload: payload,
  };
};
export const setProfilePrimaryEmail = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type: SET_PROFILE_PRIMARY_EMAIL,
    payload: payload,
  };
};
export const setProfileSecondaryEmail = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_SECONDARY_EMAIL,
    payload: payload,
  };
};
export const setProfileShipAddress = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_SHIP_ADDRESS,
    payload: payload,
  };
};
export const setProfileShipCity = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_SHIP_CITY,
    payload: payload,
  };
};
export const setProfileShipState = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_SHIP_STATE,
    payload: payload,
  };
};
export const setProfileShipZipcode = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_SHIP_ZIPCODE,
    payload: payload,
  };
};
export const setProfileBillAddress = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_BILL_ADDRESS,
    payload: payload,
  };
};
export const setProfileBillCity = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_BILL_CITY,
    payload: payload,
  };
};
export const setProfileBillState = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_BILL_STATE,
    payload: payload,
  };
};   
export const setProfileBillZipcode = (payload) => {
  console.log('payload is', payload.profileForm);
  return {
    type:  SET_PROFILE_BILL_ZIPCODE,
    payload: payload,
  };
};