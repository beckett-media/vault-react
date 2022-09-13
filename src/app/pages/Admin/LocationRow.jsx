import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Spinner, ListGroup } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { getInventory, postInventory, putInventory, getInventoryZoneOptions } from '../../services/inventory';
import { blankLocation } from '../../const/inventory';

// Use this component with the useInventoryLocation hook in the parent component

const InventoryLocationForm = ({ itemId }) => {
  const [apiRetrigger, setApiRetrigger] = useState({});
  const [initialInventory, setInitialInventory] = useState([]);
  const [inventory, setInventory] = useState(blankLocation);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPutLoading, setIsPutLoading] = useState(false);
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
    <Form onSubmit={(e) => createNewLocation(e)} className='mt-2'>
      <div className='d-flex gap-2'>
        <Form.Group>
          <Form.Label>Vault</Form.Label>
          <Form.Select required onChange={(e) => updateInventory({ vault: e.target.value })} className='w-fit-content'>
            <option value=''> - Select -</option>
            <option value={'dallas'}>Dallas</option>
            <option value={'delaware'}>Delaware</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Zone</Form.Label>
          <Form.Select required onChange={(e) => updateInventory({ zone: e.target.value })} className='w-fit-content'>
            <option value=''>- Select -</option>
            {zoneOptions.map((item, index) => (
              <option key={`zone-area_${index}`} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {(inventory?.zone?.toLowerCase().startsWith('credenza') ||
          inventory?.zone?.toLowerCase().startsWith('cabinet')) && (
          <div className='d-flex gap-2'>
            <Form.Group>
              <Form.Label>Shelf</Form.Label>
              <Form.Select
                required
                onChange={(e) => updateInventory({ shelf: e.target.value })}
                className='w-fit-content'
              >
                <option value=''>- Select -</option>
                <option value='1'>Shelf 1</option>
                <option value='2'>Shelf 2</option>
                <option value='3'>Shelf 3</option>
                <option value='4'>Shelf 4</option>
                <option value='5'>Shelf 5</option>
                <option value='6'>Shelf 6</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Box</Form.Label>
              <Form.Control required onChange={(e) => updateInventory({ box: e.target.value })} className='mb-0' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Slot</Form.Label>
              <Form.Control required onChange={(e) => updateInventory({ slot: e.target.value })} className='mb-0' />
            </Form.Group>
          </div>
        )}
        {inventory?.zone?.toLowerCase().endsWith('gallery wall') && (
          <div className='d-flex gap-2'>
            <Form.Group>
              <Form.Label>Row</Form.Label>
              <Form.Select
                required
                onChange={(e) => updateInventory({ row: e.target.value })}
                className='w-fit-content'
              >
                <option value=''>- Select -</option>
                <option value='1'>Row 1</option>
                <option value='2'>Row 2</option>
                <option value='3'>Row 3</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Slot</Form.Label>
              <Form.Control required onChange={(e) => updateInventory({ slot: e.target.value })} className='mb-0' />
            </Form.Group>
          </div>
        )}
        <div className='admin-page_location-switch-wrapper'>
          <Form.Check type='switch' id='custom-switch' label='Cascade' />
        </div>
      </div>
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
  );
};

export default InventoryLocationForm;
