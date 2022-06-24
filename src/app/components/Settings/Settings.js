import React from 'react'
import { Accordion, Container, Form } from 'react-bootstrap'

const Settings = () => {
  return (
    <Container fluid>
      <Row>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Profile</Accordion.Header>
            <Accordion.Body>
              <Form>
                {/* Implement a drag and drop feature */}
                <Form.Group>
                  <Form.Label>
                    Display Name
                  </Form.Label>
                  <Form.Control type='text'/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Choose a profile image...
                  </Form.Label>
                  <Form.Control type='file'/>
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