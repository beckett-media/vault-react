const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';

console.log( config)
export const postSubmission = async (obj) => {
  axiosRetry(axios, { retries: 3 });
  console.log('ran', obj);
  const final = {
    user_name: obj.userName,
    grading_company: obj.gradingCompany || '',
    serial_number: obj.serialNumber || '',
    title: obj.title || '',
    description: obj.description,
    genre: obj.genre || '',
    manufacturer: obj.manufacturer || '',
    year: parseInt(obj.year) || parseInt('0000'),
    overall_grade: obj.overallGrade || '',
    sub_grades: obj.subGrades || '',
    autograph: obj.autograph || '',
    subject: obj.subject || '',
    image_base64: obj.img || '',
    image_format: obj.imgFormat || '',
    status_
  };
  return axios
    .post(`${config.BASE_URL}/marketplace/submission`, final)
    .then((res) => {
      console.log('res', res);
      return res;
    });
};

export const getSubmissions = async (userName) => {
  console.log(userName)
  return axios.get(`${config.BASE_URL}/marketplace/submission`, 
    {params: {user_name: userName}}).then((res) => {
    console.log('res', res);
    return res;
  });
};
