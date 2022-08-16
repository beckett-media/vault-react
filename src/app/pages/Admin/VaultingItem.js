import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import { VAULTING_STATUS } from '../../services/items';
import { getInventory, postInventory, updateInventory } from '../../services/inventory';

const zoneOptions = ["Cabinet 1",
  "Cabinet 2",
  "Cabinet 3",
  "Cabinet 4",
  "Cabinet 5",
  "Cabinet 6",
  "Cabinet 7",
  "Cabinet 8",
  "Credenza 1",
  "Credenza 2",
  "Credenza 3",
  "Credenza 4",
  "Credenza 5",
  "Credenza 6",
  "Credenza 7",
  "Credenza 8",
  "Main Display Case",
  "Pedestal 1",
  "Pedestal 2",
  "Comics Gallery Wall",
  "Card Gallery Wall"]

function VaultingItem({ onWithdraw, item }) {
  const [inventory, setInventory] = useState({});
  const shouldEnableWithdrawButton = item.status === VAULTING_STATUS.Minted;

  console.log(item)
  console.log(inventory)

  useEffect(() => {
    getInventory({ user_uuid: item.user, item_id: item.item_id })
      .then(data => setInventory(data))
      .catch(console.log('failed to retrieve inventory'))
  }, [])

  return (
    <div className='m-4'>
      <Row>
        <Col className='info-box'>
          <p>
            {item.genre} - {item.title}
          </p>
        </Col>
        <Col className='right-align'>{item.manufacturer}</Col>
      </Row>
      <Row className='mt-4 mb-2'>
        <img src={item.image_url} alt='item' className='img-fluid' />
        <p className='mt-2'>
          <span className='fw-bold'>Status:</span> {item.status_desc}
        </p>
      </Row>
      <Row>
        <p><span className='fw-bold'>Description:</span> {item.description}</p>
        <p><span className='fw-bold'>Company:</span> {item.grading_company}</p>
        <p><span className='fw-bold'>Serial number:</span> {item.serial_number}</p>
        <p><span className='fw-bold'>Year:</span> {item.year}</p>
        <p><span className='fw-bold'>Estimated value:</span> ${item.est_value}</p>
        <p><span className='fw-bold'>Overall grade:</span> {item.overall_grade}</p>
        <p><span className='fw-bold'>Sub grades:</span> {item.sub_grades}</p>
        <p><span className='fw-bold'>Autograph:</span> {item.autograph}</p>
        <p><span className='fw-bold'>Item uuid:</span> {item.item_uuid}</p>
      </Row>
      <Row className='mt-2'>
        <Form>
          <Row>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Vault</Form.Label>
                <Form.Select defaultValue={'select'}>
                  <option>Dallas</option>
                  <option>Delaware</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Zone</Form.Label>
                <Form.Select value={'test'}>
                  {zoneOptions.map((item, index) => (
                    <option key={`zone-area_${index}`}>{item}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Test</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Row>
      <div className='mt-4'>
        <SubmitButton
          func={() => onWithdraw(item.id)}
          title='Withdraw'
          bg='danger'
          disabled={!shouldEnableWithdrawButton}
        />
      </div>
    </div>
  );
}

export default VaultingItem;
