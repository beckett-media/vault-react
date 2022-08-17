import { validPhone } from "./validationRegex"

export const formatPhoneNumber = (phone) => {
  const phoneHasPrefix = phone.slice(0,2) === '+1'
  if(!phoneHasPrefix){
    if(validPhone.test(phone)){
      return '+1' + phone
    }
  }
  else if(!validPhone.test(phone.slice(2))){
    setError({message: 'Invalid phone number format.'})
  }
  else return phone
}