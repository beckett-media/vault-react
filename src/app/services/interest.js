export const postInterestForm = async (formData) => {
  console.log(formData)
  return axios.post(`${config.BASE_URL}/interest-form/submission`, final).then((res) => {
    return res;
  });
};
