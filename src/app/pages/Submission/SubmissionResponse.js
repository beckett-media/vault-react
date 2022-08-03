import React from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as SuccessSVG } from '../../assets/beckett-check-icon.svg';
import { ReactComponent as ErrorSVG } from '../../assets/beckett-error-icon.svg';

const SubmissionResponse = ({ submissionResponse, setSubmissionResponse }) => {
  // const response = JSON.parse(submissionResponse);
  const response = { statusCode: 404, message: 'Submission not found', error: 'Not Found' };

  console.log(response);

  const success = response.statusCode === 200;
  const image = success ? (
    <SuccessSVG className='submission_response-image' />
  ) : (
    <ErrorSVG className='submission_response-image' />
  );
  const heading = success ? 'Success!' : 'Error';
  const body = success
    ? 'Your card has been submitted.'
    : `${response.statusCode}, ${response.message.toLocaleLowerCase()}.`;

  return (
    <div className='w-100 h-100'>
      <div className='submission_form'>
        <div className='submission_form-section'>
          <div className='submission_form-response'>
            <div className='submission_response-image-wrapper'>{image}</div>
            <div className='submission_response-body-wrapper'>
              <div className='submission_response-heading'>{heading}</div>
              <div className='submission_response-body'>{body}</div>
            </div>
            <Button onClick={() => setSubmissionResponse('')}>OK</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

SubmissionResponse.defaults = {
  submissionResponse: { statusCode: 404, message: 'Submission not found', error: 'Not Found' },
};

export default SubmissionResponse;
