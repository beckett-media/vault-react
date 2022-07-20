import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getSingleSubmission } from '../../services/submission';
import ImageUploader from '../../components/Generic/ImageUploader';
import './CreateVaultingPage.scss';
import SubmitButton from '../../components/Generic/SubmitButton';
import { createVaulting } from '../../services/items';

function AdminCreateVaultingPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = React.useState({});
  const [image, setImage] = React.useState({});
  const isValidId = submissionId && !isNaN(Number(submissionId));

  React.useEffect(() => {
    // TODO: Check if vaulting is created already with this submissionId. Need API to check.
    const fetch = () => {
      getSingleSubmission(submissionId)
        .then((data) => {
          console.log('single submission', data);
          setSubmission(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    if (isValidId) {
      fetch(submissionId);
    }
  }, [submissionId, isValidId]);

  if (!isValidId) {
    return <Navigate to='/admin/submission' />;
  }

  const handleCreateClick = () => {
    createVaulting({
      item_id: submission.item_id,
      user: submission.user,
      submission_id: submission.id,
      image_base64: image.imageBase64,
      image_format: image.imageFormat,
    }).then((res) => {
      alert('Vaulting created');
      navigate('/admin/vaulting');
    }).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div className='create-vaulting-box'>
      <Row className='mb-4'>
        <h2>Create vaulting</h2>
      </Row>
      <Row>
        <Col>
          <h1>{submission.id}</h1>
          <p>{`Item Id: ${submission.item_id}, User: ${submission.user}`}</p>
        </Col>
        <Col className='right-align'>
          <SubmitButton title='Create' bg='success' func={handleCreateClick} />
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
          />
        </Col>
        <Col className='col-md-6 col-sm-12'>
          {image.imageBase64 && image.previewUrl ? (
            <img src={image.previewUrl} alt='Vaulting preview' width={400} />
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default AdminCreateVaultingPage;
