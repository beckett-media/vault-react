import React from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Generic/SubmitButton';
import ItemCard from '../../components/ItemCard/ItemCard';
import { SUBMISSION_STATUS } from '../../services/submission';

function SubmissionItem({ onApprove, onReject, onConfimReceipt, item }) {
  const navigate = useNavigate();
  const shouldDisableConfirmReceiptButton =
    item.status === SUBMISSION_STATUS.Received ||
    item.status === SUBMISSION_STATUS.Approved ||
    item.status === SUBMISSION_STATUS.Rejected;
  const shouldEnableApproveButton =
    item.status === SUBMISSION_STATUS.Received || item.status === SUBMISSION_STATUS.Rejected;
  const shouldEnableRejectButton = item.status === SUBMISSION_STATUS.Approved;

  return (
    <div className='m-4'>
      <Row className='mt-4 mb-2'>
        <ItemCard item={item} shouldLink={false} belongsToUser={false} />
        <p>
          Status: <b>{item.status_desc}</b>
        </p>
      </Row>
      <div className='mt-4'>
        <SubmitButton
          func={() => onConfimReceipt()}
          title='Confirm receipt'
          bg='info'
          disabled={shouldDisableConfirmReceiptButton}
        />
        &nbsp;
        <SubmitButton func={() => onApprove()} title='Approve' bg='success' disabled={!shouldEnableApproveButton} />
        &nbsp;
        <SubmitButton func={() => onReject()} title='Reject' bg='danger' disabled={!shouldEnableRejectButton} />
        &nbsp;
        <SubmitButton func={() => navigate(`/admin/submission/edit/${item.id}`)} title='Edit' bg='link' />
        <SubmitButton func={() => navigate(`/admin/submission/vaulting/${item.id}`)} title='Vaulting' bg='link' />
      </div>
    </div>
  );
}

export default SubmissionItem;
