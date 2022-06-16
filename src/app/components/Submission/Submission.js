import React, {useState} from 'react';
import {Button, Container} from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';

const Submission = () => {
  const [add, setAdd] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const dispatch = useDispatch();

  const cancelSubmission = () => setFormSubmitted(false);
  const submissionConfirmed = () => setConfirmed(true);

  return (

    <Container fluid style={{background: 'black'}} >
      {
        !confirmed && !add && <SubmissionForm
          formSubmitted={formSubmitted}
          cancelSubmission={cancelSubmission}
          setConfirm={submissionConfirmed}
        />
      }
      {confirmed && <SubmissionSuccess />}
      {add && <SubmissionAdd />}
      <Button onClick={() => setFormSubmitted(true)}>Submit</Button>
    </Container>
  );
};

export default Submission;
