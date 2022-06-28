const axios = require('axios');
const axiosRetry = require('axios-retry');

const baseUrl = 'http://localhost:3300';

export const postSubmission = async (obj) => {

axiosRetry(axios, { retries: 3 });
  console.log('ran', obj);
  const final = {
    user_id: 0,
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
  };
  return axios.post(`${baseUrl}/marketplace/submission`, final).then((res) => {
    console.log('res', res);
    return res;
  });
};

export const getSubmissions = async () => {
  return axios.get(`${baseUrl}/marketplace/submission`).then((res) => {
    console.log('res', res);
    return res;
  });
};
