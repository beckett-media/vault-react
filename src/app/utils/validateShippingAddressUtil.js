import { validateShippingAddress } from '../services/user';
var xmlParser = require('react-xml-parser');

export const validateShippingAddressUtil = async ({ address1, address2, city, state, zipcode }) => {
  const res = await validateShippingAddress({
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    zipcode: zipcode,
  });
  const xml = new xmlParser().parseFromString(res.data);
  const returnText = xml.children[0].children.filter((row) => row.name === 'ReturnText');
  if (xml.children[0].children[0].name === 'Error') {
    throw new Error(xml.children[0].children[0].children[2].value);
  } else if (returnText[0]) {
    throw new Error(returnText[0].value);
  } else return;
};
