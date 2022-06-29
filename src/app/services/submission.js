const axios = require('axios');
import config from "../../config";

export const postSubmission = async (obj) => {
  console.log('ran');
  const final = {
    user_id: 0,
    grading_company: obj.gradingCompany,
    serial_number: obj.serialNumber,
    title: obj.title || '',
    description: obj.description,
    genre: obj.genre || '',
    manufacturer: obj.manufacturer || '',
    year: obj.year || '',
    overall_grade: obj.overallGrade || '',
    sub_grades: obj.subGrades || '',
    autograph: obj.autograph || '',
    subject: obj.subject || '',
    image_base64: obj.img || '',
    image_format: obj.imgFormat || '',
  };
  return axios.post(`${config.BASE_URL}/marketplace/submission`, final).then((res) => {
    console.log('res', res);
    return res;
  });
};

export const getSubmissions = async () => {
  return axios.get(`${config.BASE_URL}/marketplace/submission`).then((res) => {
    console.log('res', res);
    return res;
  });
};
