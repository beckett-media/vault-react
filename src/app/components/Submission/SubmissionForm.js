import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import '../../../index.css';
import Footer from '../Generic/Footer';
import Header from '../Generic/Header';
import SubmissionConfirmModal from './SubmissionConfirmModal';

const SubmissionForm = (props) => {
  const {formSubmitted, setConfirm, cancelSubmission} = props;
  return (
    <>
      <Header />
      <h1>Submission Form</h1>
      <div>Items to Add</div>
      <SubmissionConfirmModal 
        show={formSubmitted} 
        setConfirm={setConfirm} 
        onHide={cancelSubmission}
      />
      <Form>
        <Row>
          <Col>
            {[{a:'1.', b: 'title b'}, {a:'2.', b: 'title d'}].map(obj => {
              return (
                <p>{obj.a}  {obj.b}</p>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Button>+ BGS</Button>
          <Button>+ Other</Button>
        </Row>

        <div>User Info</div>
        <Row>
        </Row>
      </Form>
      <Footer />
    </>
  );
};

export default SubmissionForm;
