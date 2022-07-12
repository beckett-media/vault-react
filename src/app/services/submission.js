const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';

export const postSubmission = async (submissionObj) => {
  axiosRetry(axios, { retries: 3 });
  const final = {
    user_name: submissionObj.userName,
    grading_company: submissionObj.gradingCompany || '',
    serial_number: submissionObj.serialNumber || '',
    title: submissionObj.title || '',
    description: submissionObj.description,
    genre: submissionObj.genre || '',
    manufacturer: submissionObj.manufacturer || '',
    year: parseInt(submissionObj.year) || parseInt('0000'),
    overall_grade: submissionObj.overallGrade || '',
    sub_grades: submissionObj.subGrades || '',
    autograph: submissionObj.autograph || '',
    subject: submissionObj.subject || '',
    image_base64: submissionObj.img || '',
    image_format: submissionObj.imgFormat || '',
  };
  return axios
    .post(`${config.BASE_URL}/marketplace/submission`, final)
    .then((res) => {
      return res;
    });
};

export const getSubmissions = async (userName) => {
  return axios.get(`${config.BASE_URL}/marketplace/submission`, 
    {params: {user_name: userName}}).then((res) => {
      return res;
  });
};
