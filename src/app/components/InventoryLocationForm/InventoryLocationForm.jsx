import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { getInventory, postInventory, putInventory } from '../../services/inventory';

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

// Use this component with the useInventoryLocation hook in the parent component

const InventoryLocationForm = ({ itemId }) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState({});
  const [inventory, setInventory] = useState(blankLocation);

  console.log(itemId);

  useEffect(() => {
    getInventory({ item_ids: [itemId] })
      .then((data) => {
        setInitialInventory(...data);
      })
      .catch(console.log('test'));
  }, [apiRetrigger]);

  console.log(initialInventory);

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const locationFormSubmit = (e) => {
    e.preventDefault();
    console.log(inventory);

    if (!!initialInventory) {
      putInventory(initialInventory.id, inventory)
        .then((resp) => console.log('success!'))
        .catch((e) => console.log(e));
      setApiRetrigger({});
    } else {
      inventory.item_id = itemId - 0;
      inventory.is_current = true;
      postInventory(inventory)
        .then((resp) => console.log('success!'))
        .catch((e) => console.log(e));
      setApiRetrigger({});
    }
  };

  return (
    <>
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
    </>
  );
};

export default InventoryLocationForm;
