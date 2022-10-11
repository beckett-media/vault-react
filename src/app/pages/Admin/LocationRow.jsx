import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { getInventory, getInventoryZoneOptions } from '../../services/inventory';
import './AdminPage.scss';
const InventoryLocationForm = ({ updateInventory, inventory, cascadeToggleHanlder, setSaveButtonIsDisabled }) => {
  const zoneOptions = getInventoryZoneOptions();
  const [slotAvailable, setSlotAvailable] = useState(null);
  const [slotClassName, setSlotClassName] = useState('mb-0');
  const getAvailableSlotOptions = (e) => {
    e.preventDefault();
    getInventory().then((res) => {
      const takenSlots = res.filter(
        (vlt) =>
          vlt.vault === inventory.vault &&
          vlt.zone === inventory.zone &&
          vlt.shelf === inventory.shelf &&
          vlt.row === inventory.row &&
          vlt.box === inventory.box &&
          vlt.slot === String(e.target.value),
      );
      setSlotAvailable(!takenSlots.length);
      setSaveButtonIsDisabled(takenSlots.length !== 0);
    });
    setSlotClassName(slotAvailable || e.target.value === '' ? 'mb-0' : 'slot-unavailable');
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
              <Form.Label>Row</Form.Label>
              <Form.Control required onChange={(e) => updateInventory({ row: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Box</Form.Label>
              <Form.Control required onChange={(e) => updateInventory({ box: e.target.value })} className='mb-0' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Slot</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  updateInventory({ slot: e.target.value });
                  getAvailableSlotOptions(e);
                }}
                className={slotClassName}
              />
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
              <Form.Control
                required
                onChange={(e) => updateInventory({ slot: e.target.value })}
                className={slotClassName}
              />
            </Form.Group>
          </div>
        )}
        <div className='admin-page_location-switch-wrapper'>
          <Form.Check type='switch' id='custom-switch' label='Cascade' onChange={cascadeToggleHanlder} />
        </div>
      </div>
      <div className='d-flex gap-2 mt-2'></div>
    </Form>
  );
};

export default InventoryLocationForm;
