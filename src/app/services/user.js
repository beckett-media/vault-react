import { axiosClient } from './index';
import { swapObjectKeyValue } from '../utils/strings';

const nonMutableAttributes = new Set(['sub', 'email_verified']);
const cognitoToUser = {
  'custom:country': 'country',
  'custom:address_line_1': 'addressLine1',
  'custom:address_line_2': 'addressLine2',
  'custom:city': 'city',
  'custom:state': 'state',
  'custom:zipcode': 'zipcode',
  'custom:ship_country': 'shipCountry',
  'custom:ship_address_line_1': 'shipAddressLine1',
  'custom:ship_address_line_2': 'shipAddressLine2',
  'custom:ship_city': 'shipCity',
  'custom:ship_state': 'shipState',
  'custom:ship_zipcode': 'shipZipcode',
  'custom:profile_img': 'profile',
  email_verified: 'emailVerified',
  given_name: 'givenName',
  family_name: 'familyName',
  phone_number: 'phone',
};

const userToCognito = swapObjectKeyValue(cognitoToUser);
export const requiredNewUserProperties = ['userName', 'email', 'password', 'phone', 'firstName', 'lastName'];
export const defaultNewUser = requiredNewUserProperties.reduce((map, cur) => {
  return { ...map, [cur]: '' };
}, {});

export const mapCognitoToUser = (cognitoUser) => {
  return cognitoUser.reduce((acc, attr) => {
    const newName = cognitoToUser[attr.Name] ? cognitoToUser[attr.Name] : attr.Name;
    acc[newName] = attr.Value;
    return acc;
  }, {});
};

export const getUserName = (user) => {
  return `${user.familyName || ''} ${user.givenName || ''}`;
};

export const mapUserToCognito = (user) => {
  return Object.keys(user)
    .map((key) => {
      const newName = userToCognito[key] ? userToCognito[key] : key;
      if (nonMutableAttributes.has(newName)) return null;
      return {
        Name: newName,
        Value: user[key],
      };
    })
    .filter((v) => v);
};

export const getAdminUserGroups = (token) => {
  return axiosClient
    .get(`/auth/admin`, {
      headers: {
        Authorization: `Bearer ${token || window.localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => res.data);
};

export const submitNewUser = async (newUser) => {
  await authContext
    .signUpUser(newUser.userName, newUser.password, newUser.email, newUser.phone, newUser.firstName, newUser.lastName)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
