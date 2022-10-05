import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getSingleSubmission, SUBMISSION_STATUS } from '../../../services/submission';
import './CreateVaultingPage.scss';
import SubmitButton from '../../../components/Generic/SubmitButton';
import { createVaulting, fetchItemBySubmission } from '../../../services/items';

function AdminCreateVaultingPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = React.useState({});
  const isValidId = submissionId && !isNaN(Number(submissionId));
  const [isExisting, setIsExisting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // TODO: Check if vaulting is created already with this submissionId. Need API to check.
    const fetch = () => {
      setIsLoading(true);

      getSingleSubmission(submissionId)
        .then((data) => {
          setSubmission(data);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      fetchItemBySubmission(submissionId)
        .then((data) => {
          setIsExisting(data && data.length > 0);
        })
        .catch((err) => {
          setIsExisting(false);
        });
    };

    if (isValidId) {
      fetch(submissionId);
    }
  }, [submissionId, isValidId]);

  if (!isValidId) {
    return <Navigate to='/admin/submission' replace={true} />;
  }

  const handleCreateClick = () => {
    createVaulting({
      item_id: submission.item_id,
      user: submission.user,
      submission_id: submission.id,
    })
      .then((res) => {
        alert('Vaulting created');
        navigate('/admin/vaulting');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const isNotApproved = submission.status !== SUBMISSION_STATUS.Approved;

  return (
    <div className='create-vaulting-box'>
      <Row className='mb-4'>
        <h2>Create vaulting</h2>
      </Row>
      {isLoading ? (
        <Row>Loading...</Row>
      ) : (
        <>
          <Row>
            <Col>
              <h1>{submission.id}</h1>
              <p>{`Item Id: ${submission.item_id}, User: ${submission.user}`}</p>
              <p>{`Player: ${submission.player}, Year: ${submission.year}`}</p>
              <p>{`Set name: ${submission.set_name}, Card number: ${submission.card_number}`}</p>
            </Col>
            <Col className='right-align'>
              {isExisting ? <p className='existing-error'>Existing already</p> : null}
              {isNotApproved ? <p className='existing-error'>Submission is not approved</p> : null}
              <SubmitButton
                title='Create'
                bg='success'
                func={handleCreateClick}
                disabled={isExisting || isNotApproved}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default AdminCreateVaultingPage;
