import axios from 'axios';
import config from '../../config';

var xmlParser = require('react-xml-parser');

export const externalAddressValidation = (address) => {
  // TODO: ** IMPORTANT ** :: USPS API credentials need to be set to an environment variable if we move beyond address verififaction.
  const xml = `
    <AddressValidateRequest USERID="${config.USPS_API_USERID}">
      <Address ID="0">
        <Address1>${address.address1}</Address1>
        ${address.address2 ? `<Address2>${address.address2}</Address2>` : '<Address2/>'}
        <City>${address.city}</City>
        <State>${address.state}</State>
        <Zip5>${address.zipcode}</Zip5>
        <Zip4/>
      </Address>
    </AddressValidateRequest>`;
  return axios.get(
    `${
      window.location.href.indexOf('localhost') === -1 ? 'https' : 'http'
    }://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=` + encodeURIComponent(xml),
    {
      headers: { 'Content-Type': 'text/xml' },
    },
  );
};

export const validateAddress = async ({ address1, address2, city, state, zipcode }) => {
  const res = await externalAddressValidation({
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
