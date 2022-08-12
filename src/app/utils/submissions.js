const defaultSub = {
  grading_company: '',
  serial_number: '',
  title: '',
  description: '',
  genre: '',
  manufacturer: '',
  year: 1970,
  overall_grade: '',
  sub_grades: '',
  autograph: '',
  subject: '',
  est_value: 0,
  image_base64: '',
  image_format: 'img/png',
  image_rev_base64: '',
  image_rev_format: 'img/png',
};

export const formatSubmissionItem = (item) => {
  return {
    grading_company: item.gradingCompany || defaultSub.grading_company,
    serial_number: item.serialNumber || defaultSub.serial_number,
    title: item.title || defaultSub.title,
    description: item.description || defaultSub.description,
    genre: item.genre || defaultSub.genre,
    manufacturer: item.manufacturer || defaultSub.manufacturer,
    year: item.year || defaultSub.year,
    overall_grade: item.overallGrade || defaultSub.overall_grade,
    sub_grades: item.subGrades || defaultSub.sub_grades,
    autograph: item.autoGraph || defaultSub.autograph,
    subject: item.subject || defaultSub.subject,
    est_value: item.estimatedValue || defaultSub.est_value,
    image_base64: item.imageBase64.split(`data:${item.imageFormat};base64,`)[1] || defaultSub.image_base64,
    image_format: item.imageFormat || defaultSub.image_format,
    image_rev_base64:
      item.imageRevBase64.split(`data:${item.imageRevFormat};base64,`)[1] || defaultSub.image_rev_base64,
    image_rev_format: item.imageRevFormat || defaultSub.image_rev_format,
  };
};

export const extractUpdatedParts = (src, dst) => {
  const keys = Object.keys(src);
  const result = {};

  for (const key of keys) {
    if (src[key] !== dst[key]) {
      result[key] = dst[key];
    }
  }

  return result;
};
