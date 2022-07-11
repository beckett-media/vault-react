export const postInterestForm = async (formData) => {
  return axios
    .post(`${config.BASE_URL}/interest-form/submission`, final)
    .then((res) => {
      console.log('res', res);
      return res;
    });
};
