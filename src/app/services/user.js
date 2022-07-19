import axios from 'axios';
import config from '../../config';
import { swapObjectKeyValue } from '../utils/strings';

const mockUser = {
  id: 1,
  name: 'Beckett SuperUser',
  email: 'super@Man.com',
  img: 'https://www.sideshow.com/storage/product-images/907776/superman_dc-comics_square.jpg',
};

const cognitoToUser = {
  'custom:state': 'state',
  'custom:ship_address_line_1': 'shipAddressLine1',
  'custom:address_line_1': 'addressLine1',
  'custom:ship_city': 'shipCity',
  'custom:country': 'country',
  'custom:given_name': 'givenName',
  'custom:ship_state': 'shipState',
  'custom:city': 'city',
  'custom:profile': 'profile',
  'custom:ship_address_line_2': 'shipAddressLine2',
  'custom:family_name': 'familyName',
  'custom:address_line_2': 'addressLine2',
  'custom:ship_country': 'shipCountry',
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

export const getAdminUserGroups = () => {
  return axios.get(`${config.BASE_URL}/auth/admin`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
  });
};
