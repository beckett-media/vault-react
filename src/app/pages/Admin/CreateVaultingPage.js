import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getSingleSubmission, SUBMISSION_STATUS } from '../../services/submission';
import ImageUploader from '../../components/Generic/ImageUploader';
import './CreateVaultingPage.scss';
import SubmitButton from '../../components/Generic/SubmitButton';
import { createVaulting, fetchItemBySubmission } from '../../services/items';

function AdminCreateVaultingPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = React.useState({});
  const [image, setImage] = React.useState({});
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
      image_base64: image.imageBase64?.split(`data:${image.imageFormat};base64,`)[1] || '',
      image_format: image.imageFormat.split('/')[1] || 'png',
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
          <Row className='mt-4'>
            <Col className='col-md-6 col-sm-12'>
              <ImageUploader
                onFileChange={(obj) => {
                  if (obj) {
                    setImage(obj);
                  } else {
                    setImage({
                      imageFormat: null,
                      imageBase64: null,
                    });
                  }
                }}
                heading="Please upload an image here"
              />
            </Col>
            <Col className='col-md-6 col-sm-12'>
              {image.imageBase64 && image.previewUrl ? (
                <img src={image.previewUrl} alt='Vaulting preview' width={400} />
              ) : null}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default AdminCreateVaultingPage;
