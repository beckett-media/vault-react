import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import { VAULTING_STATUS } from '../../services/items';
import { getInventory, postInventory, putInventory } from '../../services/inventory';
import './VaultingItem.scss';

const zoneOptions = [
  'Cabinet 1',
  'Cabinet 2',
  'Cabinet 3',
  'Cabinet 4',
  'Cabinet 5',
  'Cabinet 6',
  'Cabinet 7',
  'Cabinet 8',
  'Credenza 1',
  'Credenza 2',
  'Credenza 3',
  'Credenza 4',
  'Credenza 5',
  'Credenza 6',
  'Credenza 7',
  'Credenza 8',
  'Main Display Case',
  'Pedestal 1',
  'Pedestal 2',
  'Comics Gallery Wall',
  'Card Gallery Wall',
];

const blankLocation = {
  vault: '',
  zone: '',
  shelf: '',
  row: '',
  box: '',
  slot: '',
};

function VaultingItem({ onWithdraw, item }) {
  const shouldEnableWithdrawButton = item.status === VAULTING_STATUS.Minted;
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState({});
  const [inventory, setInventory] = useState(blankLocation);

  useEffect(() => {
    getInventory({ item_ids: [item.item_id] })
      .then((data) => {
        setInitialInventory(...data);
      })
      .catch(console.log('failed to retrieve inventory'));
  }, [apiRetrigger]);

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const locationFormSubmit = (e) => {
    e.preventDefault();

    if (initialInventory) {
      putInventory(initialInventory.id, inventory)
        .then()
        .catch((e) => console.log(e));
      setApiRetrigger({});
    } else {
      inventory.item_id = item.item_id;
      postInventory(inventory)
        .then()
        .catch((e) => console.log(e));
      setApiRetrigger({});
    }
  };

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
        <img src={item.image_url} alt='item' className='img-fluid admin-vaulting_item' />
        <p className='mt-2'>
          <span className='fw-bold'>Status:</span> {item.status_desc}
        </p>
      </Row>
      <Row>
        <p>
          <span className='fw-bold'>Description:</span> {item.description}
        </p>
        <p>
          <span className='fw-bold'>Company:</span> {item.grading_company}
        </p>
        <p>
          <span className='fw-bold'>Serial number:</span> {item.serial_number}
        </p>
        <p>
          <span className='fw-bold'>Year:</span> {item.year}
        </p>
        <p>
          <span className='fw-bold'>Estimated value:</span> ${item.est_value}
        </p>
        <p>
          <span className='fw-bold'>Overall grade:</span> {item.overall_grade}
        </p>
        <p>
          <span className='fw-bold'>Sub grades:</span> {item.sub_grades}
        </p>
        <p>
          <span className='fw-bold'>Autograph:</span> {item.autograph}
        </p>
        <p>
          <span className='fw-bold'>Item uuid:</span> {item.item_uuid}
        </p>
      </Row>
      <Row className='mt-4'>
        <div>
          <span className='fw-bold'>Vault location: </span>
          {initialInventory ? initialInventory.label : 'No inventory location set'}
        </div>
        <Form onSubmit={(e) => locationFormSubmit(e)} className='mt-2 mb-4'>
          <Row>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Vault</Form.Label>
                <Form.Select onChange={(e) => updateInventory({ vault: e.target.value })}>
                  <option> - Select -</option>
                  <option value={'dallas'}>Dallas</option>
                  <option value={'delaware'}>Delaware</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Zone</Form.Label>
                <Form.Select onChange={(e) => updateInventory({ zone: e.target.value })}>
                  <option>- Select -</option>
                  {zoneOptions.map((item, index) => (
                    <option key={`zone-area_${index}`} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {(inventory?.zone?.toLowerCase().startsWith('credenza') ||
            inventory?.zone?.toLowerCase().startsWith('cabinet')) && (
            <Row>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Shelf</Form.Label>
                  <Form.Select onChange={(e) => updateInventory({ shelf: e.target.value })}>
                    <option>- Select -</option>
                    <option value='1'>Shelf 1</option>
                    <option value='2'>Shelf 2</option>
                    <option value='3'>Shelf 3</option>
                    <option value='4'>Shelf 4</option>
                    <option value='5'>Shelf 5</option>
                    <option value='6'>Shelf 6</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Box</Form.Label>
                  <Form.Control onChange={(e) => updateInventory({ box: e.target.value })} />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Slot</Form.Label>
                  <Form.Control onChange={(e) => updateInventory({ slot: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
          )}
          {inventory?.zone?.toLowerCase().endsWith('gallery wall') && (
            <Row>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Row</Form.Label>
                  <Form.Select onChange={(e) => updateInventory({ row: e.target.value })}>
                    <option>- Select -</option>
                    <option value='1'>Row 1</option>
                    <option value='2'>Row 2</option>
                    <option value='3'>Row 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Slot</Form.Label>
                  <Form.Control onChange={(e) => updateInventory({ slot: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
          )}
          <Button type='submit' className='mt-4'>
            {initialInventory ? 'Update Location' : 'Add Location'}
          </Button>
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
