import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import { VAULTING_STATUS } from '../../services/items';
import { useInventoryLocation } from '../../hooks/useInventoryLocation';
import { getInventory, postInventory, putInventory, getInventoryZoneOptions } from '../../services/inventory';
import './VaultingItem.scss';
import { blankLocation } from '../../const/inventory';

function VaultingItem({ onWithdraw, item }) {
  const shouldEnableWithdrawButton = item.status === VAULTING_STATUS.Minted;
  const { currentLocation } = useInventoryLocation(item.item_id);

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
        <p>
          <span className='fw-bold'>Item id:</span> {item.item_id}
        </p>
        <p>
          <span className='fw-bold'>Vault location:</span> {currentLocation ? currentLocation.label : 'No location set'}
        </p>
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
