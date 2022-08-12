import React from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as SuccessSVG } from '../../assets/beckett-check-icon.svg';
import { ReactComponent as ErrorSVG } from '../../assets/beckett-error-icon.svg';

const SubmissionResponse = ({ submissionResponse, setSubmissionResponse, body }) => {

  const success = false;
  const image = success ? (
    <SuccessSVG className='submission_response-image' />
  ) : (
    <ErrorSVG className='submission_response-image' />
  );
  const heading = success ? 'Success!' : 'Error';

  return (
    <div className='w-100 h-100'>
      <div className='submission_form'>
        <div className='submission_form-section'>
          <div className='submission_form-response'>
            <div className='submission_response-image-wrapper'>{image}</div>
            <div className='submission_response-body-wrapper'>
              <div className='submission_response-heading'>Error</div>
              <div className='submission_response-body'>{body}</div>
            </div>
            <Button onClick={() => setSubmissionResponse(null)}>OK</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResponse;
