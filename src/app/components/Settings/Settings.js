import React, { useState } from 'react'
import { Accordion, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setProfileBillAddress,
  setProfileBillCity,
  setProfileBillState,
  setProfileBillZipcode,
  setProfileFirstName, 
  setProfileLastName,
  setProfilePrimaryEmail,
  setProfilePrimaryPhone,
  setProfileSecondaryEmail,
  setProfileSecondaryPhone
} from '../../state/Profile/actions'
import { profileFormSelector } from '../../state/Profile/selectors'
import SubmitButton from '../Generic/SubmitButton'

const Settings = () => {
  const {
    billAddress,
    billCity,
    billState,
    billZipcode,
    firstName,
    lastName,
    primaryEmail,
    primaryPhone,
    secondaryEmail,
    secondaryPhone,
    shipAddress,
    shipCity,
    shipState,
    shipZipcode,
  } = useSelector(profileFormSelector);
  const [ profileTab, setProfileTab ] = useState('profile')
  const submitChanges = () => { return /** axiosCall */}
  const dispatch = useDispatch()
  const shippingMatchesBilling = (val) => {
    dispatch(setProfileBillAddress(shipAddress))
    dispatch(setProfileBillCity(shipCity))
    dispatch(setProfileBillState(shipState))
    dispatch(setProfileBillZipcode(shipZipcode))
  }
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Accordion defaultActiveKey='Profile'>
          <Accordion.Item eventKey='Profile' onClick={() => setProfileTab('profile')}>
            <Accordion.Header>{profileTab === 'profile' ? <div>Profile &or;</div> : <div>Profile &and;</div>}</Accordion.Header>
            <Accordion.Body>
              <Form>
                {/* Implement a drag and drop feature */}
                <Row>
                  <Form.Group>
                    <Form.Label>
                      First Name
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={firstName}
                      onChange={(e) => 
                        dispatch(setProfileFirstName(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Last Name
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={lastName}
                      onChange={(e) => 
                        dispatch(setProfileLastName(e.target.value))}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      Primary Phone
                    </Form.Label>
                    <Form.Control 
                      type='text'
                      value={primaryPhone}
                      onChange={(e) => 
                        dispatch(setProfilePrimaryPhone(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Secondary Phone
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={secondaryPhone}
                      onChange={(e) => 
                        dispatch(setProfileSecondaryPhone(e.target.value))}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      Primary Email
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={primaryEmail}
                      onChange={(e) => 
                        dispatch(setProfilePrimaryEmail(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Secondary Email
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={secondaryEmail}
                      onChange={(e) => 
                        dispatch(setProfileSecondaryEmail(e.target.value))}
                    />
                  </Form.Group>
                </Row>
                {/* <Form.Group>
                  <Form.Label>
                    Choose a profile image...
                  </Form.Label>
                  <Form.Control type='file'/>
                </Form.Group> */}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='Address' onClick={() => setProfileTab('address')}>
            <Accordion.Header>{profileTab === 'address' ? <div>Address &or;</div> : <div>Address &and;</div>}</Accordion.Header>
            <Accordion.Body>
              <Form>
                {/* Implement a drag and drop feature */}
                <Form.Label>Billing Address</Form.Label>
                <Form.Group>
                  <Form.Label>
                    Address
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      value={billAddress}
                      onChange={(e) => 
                        dispatch(setProfileBillAddress(e.target.value))}
                    />
                </Form.Group>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      City
                    </Form.Label>
                    <Form.Control 
                      type='text'
                      value={billCity}
                      onChange={(e) => 
                        dispatch(setProfileBillCity(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      State
                    </Form.Label><br/>
                    <Form.Select onChange={(e) => setProfileBillState(e)} value={billState}>
                      <option disabled>Select State</option>
                      <option value="ca">CA</option>
                      <option value="ny">NY</option>
                      <option value="tx">TX</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Zipcode
                    </Form.Label>
                    <Form.Control 
                      type='text' 
                      value={billZipcode}
                      onChange={(e) => 
                        dispatch(setProfileBillZipcode(e.target.value))}
                    />
                  </Form.Group>
                </Row>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Group>
                  <Row>
                    <Form.Check onChange={()=> shippingMatchesBilling()}/>
                    <Form.Label>
                      Shipping address is the same as billing address.
                    </Form.Label>
                  </Row>
                  </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Address
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      value={billAddress}
                      onChange={(e) => 
                        dispatch(setProfileBillAddress(e.target.value))}
                    />
                </Form.Group>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      City
                    </Form.Label>
                    <Form.Control
                      type='text'
                      value={billCity}
                      onChange={(e) => 
                        dispatch(setProfileBillCity(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      State
                    </Form.Label><br/>
                    <Form.Select 
                      onChange={(e) => setProfileBillState(e)} 
                      value={billState}
                    >
                      <option hidden value>Select State</option>
                      <option value="ca">CA</option>
                      <option value="ny">NY</option>
                      <option value="tx">TX</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Zipcode
                    </Form.Label>
                    <Form.Control 
                      type='text'
                      value={billZipcode}
                      onChange={(e) => 
                        dispatch(setProfileBillZipcode(e.target.value))}
                    />
                  </Form.Group>
                </Row>
                <SubmitButton func={submitChanges} title='Update'/>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  )
}

export default Settings