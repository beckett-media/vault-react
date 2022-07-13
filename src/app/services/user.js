const mockUser = {
  id: 1,
  name: 'Beckett SuperUser',
  email: 'super@Man.com',
  img: 'https://www.sideshow.com/storage/product-images/907776/superman_dc-comics_square.jpg',
};




export const getUser = async () => {
  // get the real user here
  return mockUser;
};

export const updateUser = async (user) => {
  // TODO: run validation
  // update user

  // Example of updating Cognito attributes
  // await setAttributes([{Name: "custom:given_name", Value: user.firstName}, {Name: "custom:family_name", Value: user.lastName}]);

  return user;
};
