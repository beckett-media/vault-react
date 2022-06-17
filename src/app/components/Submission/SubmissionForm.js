import React from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../../index.css';
import { submissionFormSelector } from '../../state/selectors';
import Footer from '../Generic/Footer';
import Header from '../Generic/Header';
import SubmissionConfirmModal from './SubmissionConfirmModal';

const SubmissionForm = (props) => {
  const {formSubmitted, setConfirm, cancelSubmission, onAdd} = props;
  const submissionForm = useSelector(submissionFormSelector)
  console.log(submissionForm)
  return (
    <Container fluid style={{background: 'black'}}>
      <h1>Submission Form</h1>
      <div>Items to Vault</div>
      <SubmissionConfirmModal 
        show={formSubmitted} 
        setConfirm={setConfirm} 
        onHide={cancelSubmission}
      />
      <Form>
        <Row>
          <Col>
            {submissionForm.items.map((obj,i) => {
              return (
                <p>{i}. : {obj.title}</p>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Button onClick={() => onAdd(true)}>+</Button>
        </Row>

        <div>User Info</div>
        <Row>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmissionForm;
