import React from 'react';
import { Button } from 'react-bootstrap';

const SubmissionResponse = ({ submissionResponse, setSubmissionResponse }) => {
  return (
    <div className='w-100 h-100'>
      <div className='submission_form'>
        <div className='submission_form-section'>
          <div className='submission_form-response'>
            <div className='submission_reponse-image-wrapper'></div>
            <div className='submission_reponse-body-wrapper'>{submissionResponse}</div>
            <Button onClick={() => setSubmissionResponse('')}>OK</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResponse;
