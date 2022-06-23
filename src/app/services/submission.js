const axios = require('axios')
const baseUrl = 'https://dev.beckett.com:3300/api'

export const postSubmission = async (obj) => {
  console.log('ran')
  return axios.post(`${baseUrl}/marketplace/submission`, {obj})
    .then(res => {
      console.log('res', res)
      return res
    })
  }