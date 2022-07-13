export const formatSubmissionItem = (item) => {
  return {
    grading_company: item.gradingCompany,
    serial_number: item.serialNumber,
    title: item.title,
    description: item.description,
    genre: item.genre,
    manufacturer: item.manufacturer,
    year: item.year,
    overall_grade: item.overallGrade,
    sub_grades: item.subGrades,
    autograph: item.autoGraph,
    subject: item.subject,
    est_value: item.estimatedValue,
    image_base64: item.imageBase64.split(`data:${item.imageFormat};base64,`)[1],
    image_format: item.imageFormat,
  };
};
