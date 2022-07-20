import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import { VAULTING_STATUS } from '../../services/items';

function VaultingItem({ onWithdraw, item }) {
  const shouldEnableWithdrawButton =
    item.status === VAULTING_STATUS.Minted;

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
        <p>
          Status: <b>{item.status_desc}</b>
        </p>
      </Row>
      <Row>
        <p>{item.description}</p>
        <p>{`Company: ${item.grading_company}, Serial number: ${item.serial_number}`}</p>
        <p>{`Year: ${item.year}, Estimated value: $${item.est_value}`}</p>
        <p>{`Overall grade: ${item.overall_grade}, Sub grades: ${item.sub_grades}`}</p>
        <p>{`Autograph: ${item.autograph}, Item uuid: ${item.item_uuid}`}</p>
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
