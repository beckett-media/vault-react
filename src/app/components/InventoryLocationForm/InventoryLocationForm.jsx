import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { blankLocation } from '../../const/inventory';
import { getInventory, getInventoryZoneOptions, postInventory, putInventory } from '../../services/inventory';

// Use this component with the useInventoryLocation hook in the parent component

const InventoryLocationForm = ({ itemId }) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState([]);
  const [inventory, setInventory] = useState(blankLocation);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPutLoading, setIsPutLoading] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationId, setNewLocationId] = useState();

  useEffect(() => {
    getInventory({ item_ids: [itemId] })
      .then((data) => {
        setInitialInventory(data);
      })
      .catch();
  }, [apiRetrigger]);

  const zoneOptions = getInventoryZoneOptions();

  const currentLocation = initialInventory?.find((item) => item.status === 1);

  const findInventoryById = (id) => {
    initialInventory.find((item) => item.id === id);
  };

  const updateInventory = (tempInventory) => setInventory({ ...inventory, ...tempInventory });

  const createNewLocation = (e) => {
    e.preventDefault();
    setIsPostLoading(true);

    inventory.item_id = itemId - 0;
    inventory.is_current = true;
    if (inventory.vault && inventory.zone) {
      postInventory(inventory)
        .then()
        .catch()
        .finally(
          setTimeout(() => {
            setIsPostLoading(false);
            setApiRetrigger({});
            setInventory(blankLocation);
          }, 1000),
        );
    }
    e.target.reset();
    setIsPostLoading(false);
  };

  const updateInventoryLocation = () => {
    setIsPutLoading(true);
    const putBody = { status: 1, note: 'updating location' };

    putInventory(newLocationId, putBody)
      .then()
      .catch()
      .finally(
        setTimeout(() => {
          setIsPutLoading(false);
          setApiRetrigger({});
        }, 1000),
      );
  };

  return (
    <div>
      <div>
        <span className='fw-bold'>Vault location: </span>
        {currentLocation ? currentLocation?.label : 'No inventory location set'}
      </div>
      <div>
        {initialInventory.length > 0 && (
          <>
            <span className='fw-bold'>Select another location: </span>
            <ListGroup defaultActiveKey='#current'>
              {initialInventory?.map((item, index) => (
                <ListGroup.Item
                  action
                  key={'inventory-location_' + index}
                  href={item.status === 1 ? '#current' : '#link' + index}
                  onClick={() => setNewLocationId(item.id)}
                >
                  <div className='d-flex justify-content-between'>
                    <span>{item?.label}</span>
                    <span className='fw-bold'>{item.status === 1 ? ' current' : ''}</span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
        <div className='d-flex gap-2 mt-2'>
          {initialInventory.length > 0 && (
            <Button onClick={() => updateInventoryLocation()} disabled={isPutLoading}>
              {isPutLoading ? (
                <>
                  <Spinner as='span' animation='border' role='status' aria-hidden='true' />
                  <span className='visually-hidden'>Loading...</span>
                </>
              ) : (
                'Update location'
              )}
            </Button>
          )}
          <Button
            variant='outline-primary'
            onClick={() => setIsAddingLocation(true)}
            className='d-flex align-items-center gap-2'
          >
            <BsFillPlusCircleFill />
            Add new location
          </Button>
        </div>
      </div>
      {isAddingLocation && (
        <Form onSubmit={(e) => createNewLocation(e)} className='mt-2'>
          <Row>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Vault</Form.Label>
                <Form.Select required onChange={(e) => updateInventory({ vault: e.target.value })}>
                  <option value=''> - Select -</option>
                  <option value={'dallas'}>Dallas</option>
                  <option value={'delaware'}>Delaware</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group>
                <Form.Label>Zone</Form.Label>
                <Form.Select required onChange={(e) => updateInventory({ zone: e.target.value })}>
                  <option value=''>- Select -</option>
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
              <Col lg={3}>
                <Form.Group>
                  <Form.Label>Shelf</Form.Label>
                  <Form.Select required onChange={(e) => updateInventory({ shelf: e.target.value })}>
                    <option value=''>- Select -</option>
                    <option value='1'>Shelf 1</option>
                    <option value='2'>Shelf 2</option>
                    <option value='3'>Shelf 3</option>
                    <option value='4'>Shelf 4</option>
                    <option value='5'>Shelf 5</option>
                    <option value='6'>Shelf 6</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group>
                  <Form.Label>Row</Form.Label>
                  <Form.Control required onChange={(e) => updateInventory({ row: e.target.value })} />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group>
                  <Form.Label>Box</Form.Label>
                  <Form.Control required onChange={(e) => updateInventory({ box: e.target.value })} />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group>
                  <Form.Label>Slot</Form.Label>
                  <Form.Control required onChange={(e) => updateInventory({ slot: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
          )}
          {inventory?.zone?.toLowerCase().endsWith('gallery wall') && (
            <Row>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Row</Form.Label>
                  <Form.Select required onChange={(e) => updateInventory({ row: e.target.value })}>
                    <option value=''>- Select -</option>
                    <option value='1'>Row 1</option>
                    <option value='2'>Row 2</option>
                    <option value='3'>Row 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Slot</Form.Label>
                  <Form.Control required onChange={(e) => updateInventory({ slot: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
          )}
          <div className='d-flex gap-2 mt-2'>
            <Button type='submit' disabled={isPostLoading}>
              {isPostLoading ? (
                <>
                  <Spinner as='span' animation='border' role='status' aria-hidden='true' />
                  <span className='visually-hidden'>Loading...</span>
                </>
              ) : (
                'Add location'
              )}
            </Button>
            <Button onClick={() => setIsAddingLocation(false)} variant='outline-primary'>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default InventoryLocationForm;
