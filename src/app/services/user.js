import { swapObjectKeyValue } from '../utils/strings';

const mockUser = {
  id: 1,
  name: 'Beckett SuperUser',
  email: 'super@Man.com',
  img: 'https://www.sideshow.com/storage/product-images/907776/superman_dc-comics_square.jpg',
};

const cognitoToUser = {
  'custom:given_name': 'givenName',
  'custom:family_name': 'familyName',
  'custom:country': 'country',
  'custom:address_line_1': 'addressLine1',
  'custom:address_line_2': 'addressLine2',
  'custom:city': 'city',
  'custom:state': 'state',
  'custom:zipcode': 'zipcode',
  'custom:phone': 'phone',
  'custom:ship_country': 'shipCountry',
  'custom:ship_address_line_1': 'shipAddressLine1',
  'custom:ship_address_line_2': 'shipAddressLine2',
  'custom:ship_city': 'shipCity',
  'custom:ship_state': 'shipState',
  'custom:ship_zipcode': 'shipZipcode',
  'custom:profile': 'profile',
  email_verified: 'emailVerified',
};

const userToCognito = swapObjectKeyValue(cognitoToUser);

export const getUser = async () => {
  // get the real user here
  return mockUser;
};

export const mapCognitoToUser = (cognitoUser) => {
  return cognitoUser.reduce((acc, attr) => {
    const newName = cognitoToUser[attr.Name] ? cognitoToUser[attr.Name] : attr.Name;
    acc[newName] = attr.Value;
    return acc;
  }, {});
};

export const mapUserToCognito = (user) => {
  return user.reduce((acc, attr) => {
    const newName = userToCognito[attr.Name] ? userToCognito[attr.Name] : attr.Name;
    acc[newName] = attr.Value;
    return acc;
  }, {});
};
