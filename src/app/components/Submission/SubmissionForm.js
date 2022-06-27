import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../../index.scss';
import { submissionFormSelector } from '../../state/selectors';
import SubmissionConfirmModal from './SubmissionConfirmModal';

const SubmissionForm = (props) => {
  const { formSubmitted, setConfirm, cancelSubmission, onAdd, items } = props;
  const submissionForm = useSelector(submissionFormSelector);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h1>Submission Form</h1>
      </Row>
      <Row className="justify-content-md-center">
        <div>{items.length ? 'Items to Vault' : 'Add Items to Vault'}</div>
      </Row>
      <Row className="justify-content-md-center">
        <SubmissionConfirmModal
          show={formSubmitted}
          setConfirm={setConfirm}
          onHide={cancelSubmission}
        />
      </Row>
      <Form>
        {submissionForm.items.map((obj, i) => {
          return (
            <Row key={item.id} className="justify-content-md-center">
              <p>
                {i + 1}. {obj.serialNumber} - {obj.description}
              </p>
            </Row>
          );
        })}
        <Row className="justify-content-md-center">
          <Button onClick={() => onAdd(true)}>+</Button>
        </Row>
        <Row className="justify-content-md-center" m={2}>
          <div>User Info</div>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmissionForm;
