import React, { useEffect, useState } from 'react';
import { Accordion, Container, Form, Row } from 'react-bootstrap';
import { states } from '../Assets/states';
import SubmitButton from '../Generic/SubmitButton';

const Settings = () => {
  const [profileTab, setProfileTab] = useState('profile');
  const [stateOptions, setStateOptions] = useState([]);
  const [setShippingAddress, toggleSetShippingAddress] = useState(false);
  const [billAddress, setBillAddress] = useState('');
  const [billCity, setBillCity] = useState('');
  const [billState, setBillState] = useState('');
  const [billZipcode, setBillZipcode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [shipCity, setShipCity] = useState('');
  const [shipState, setShipState] = useState('');
  const [shipZipcode, setShipZipcode] = useState('');
  const submitChanges = () => {
    return; /** axiosCall */
  };

  const shippingMatchesBilling = (val) => {
    toggleSetShippingAddress(!setShippingAddress);
  };
  useEffect(() => {
    if (setShippingAddress) {
      setShipAddress(billAddress);
      setShipCity(billCity);
      setShipState(billState);
      setShipZipcode(billZipcode);
    }
  }, [setShippingAddress]);
  useEffect(
    () =>
      setStateOptions(
        states.map((state) => {
          return (
            <option value={state} key={state}>
              {state}
            </option>
          );
        }),
      ),
    [],
  );

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Accordion defaultActiveKey='Profile'>
          <Accordion.Item
            eventKey='Profile'
            onClick={() => setProfileTab('profile')}
          >
            <Accordion.Header>
              {profileTab === 'profile' ? (
                <div>Profile &or;</div>
              ) : (
                <div>Profile &and;</div>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                {/* Implement a drag and drop feature */}
                <Row>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Primary Phone</Form.Label>
                    <Form.Control
                      type='text'
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Secondary Phone</Form.Label>
                    <Form.Control
                      type='text'
                      value={secondaryPhone}
                      onChange={(e) => setSecondaryPhone(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Primary Email</Form.Label>
                    <Form.Control
                      type='text'
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Secondary Email</Form.Label>
                    <Form.Control
                      type='text'
                      value={secondaryEmail}
                      onChange={(e) => setSecondaryEmail(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item
            eventKey='Address'
            onClick={() => setProfileTab('address')}
          >
            <Accordion.Header>
              {profileTab === 'address' ? (
                <div>Address &or;</div>
              ) : (
                <div>Address &and;</div>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Label>Billing Address</Form.Label>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    value={billAddress}
                    onChange={(e) => setBillAddress(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      value={billCity}
                      onChange={(e) => setBillCity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <br />
                    <Form.Select
                      onChange={(e) => setBillState(e.target.value)}
                      defaultValue={billState}
                    >
                      <option hidden value>
                        Select State
                      </option>
                      {stateOptions}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control
                      type='text'
                      value={billZipcode}
                      onChange={(e) => setBillZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Group>
                  <Row>
                    <Form.Check onChange={() => shippingMatchesBilling()} />
                    <Form.Label>
                      Shipping address is the same as billing address.
                    </Form.Label>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      value={shipCity}
                      onChange={(e) => setShipCity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <br />
                    <Form.Select
                      onChange={(e) => setShipState(e.target.value)}
                      defaultValue={shipState}
                    >
                      <option hidden value>
                        Select State
                      </option>
                      {stateOptions}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control
                      type='text'
                      value={shipZipcode}
                      onChange={(e) => setShipZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <SubmitButton func={submitChanges} title='Update' />
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default Settings;
