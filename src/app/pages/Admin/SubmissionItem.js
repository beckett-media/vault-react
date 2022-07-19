import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Generic/SubmitButton';
import { SUBMISSION_STATUS } from '../../services/submission';

function SubmissionItem({ onApprove, onReject, item }) {
  const navigate = useNavigate();
  const shouldEnableApproveButton =
    item.status !== SUBMISSION_STATUS.Failed || item.status !== SUBMISSION_STATUS.Approved;
  const shouldEnableRejectButton =
    item.status !== SUBMISSION_STATUS.Failed || item.status !== SUBMISSION_STATUS.Rejected;

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
          func={() => onApprove(item.id)}
          title='Approve'
          bg='success'
          disabled={!shouldEnableApproveButton}
        />
        &nbsp;
        <SubmitButton func={() => onReject(item.id)} title='Reject' bg='danger' disabled={!shouldEnableRejectButton} />
        &nbsp;
        <SubmitButton func={() => navigate(`/admin/submission/${item.id}`)} title='Vaulting' bg='link' />
      </div>
    </div>
  );
}

export default SubmissionItem;
