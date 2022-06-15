import React from 'react';
import {Button, Container, Modal} from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';

const Submission = () => {
  const [add, setAdd] = useState(false);
  const [formSubmitted, toggleFormSubmitted] = useState(false);
  // const dispatch = useDispatch();
  const confirmationModal = () => {
    return (
      <Modal />
    );
  };
  const formSubmission = async ({}) => {
    const confirmed = await confirmationModal();
    if (!confirmed) {
      return;
    }
    // TODO: This is to emulate an API call
    toggleFormSubmitted(!formSubmitted);
    alert('success!');
  };
  return (
    <Container fluid style={{background: 'black'}} >
      {!formSubmitted && !add && <SubmissionForm />}
      {formSubmitted && <SubmissionSuccess />}
      {add && <SubmissionAdd />}
      <Button title='TEST' onClick={() => !add ?
        setAdd(!add) :
        formSubmission(!formSubmitted)}/>
    </Container>
  );
};

export default Submission;
