import React, { useState } from 'react'
import { Accordion, Container, Form, Row } from 'react-bootstrap'

const Settings = () => {
  const [ profileTab, setProfileTab ] = useState('profile')
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
                    <Form.Control type='text'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Last Name
                    </Form.Label>
                    <Form.Control type='text'/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      Primary Phone
                    </Form.Label>
                    <Form.Control type='phone'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Secondary Phone
                    </Form.Label>
                    <Form.Control type='phone'/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      Primary Email
                    </Form.Label>
                    <Form.Control type='email'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Secondary Email
                    </Form.Label>
                    <Form.Control type='email'/>
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
                  <Form.Control type='text'/>
                </Form.Group>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      City
                    </Form.Label>
                    <Form.Control type='text'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      State
                    </Form.Label>
                    <Form.Select>
                      <option>A</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Zipcode
                    </Form.Label>
                    <Form.Control type='text'/>
                  </Form.Group>
                </Row>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Group>
                    <Form.Label>
                      Shipping address is the same as billing address.
                    </Form.Label>
                    <Form.Check />
                  </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Address
                  </Form.Label>
                  <Form.Control type='text'/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City
                  </Form.Label>
                  <Form.Control type='text'/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State
                  </Form.Label>
                  <Form.Select>
                    <option>A</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Zipcode
                  </Form.Label>
                  <Form.Control type='text'/>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  )
}

export default Settings