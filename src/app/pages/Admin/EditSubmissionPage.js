import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { getSingleSubmission } from '../../services/submission';
import ImageUploader from '../../components/Generic/ImageUploader';
import './CreateVaultingPage.scss';
import { updateSubmission } from '../../services/submission';
import { ReactComponent as ImageUpload } from '../../assets/image-upload-icon.svg';
import { extractUpdatedParts } from '../../utils/submissions';
import { urlToFile } from '../../utils/image';

function AdminEditSubmissionPage() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = React.useState({});
  const [item, setItem] = useState({});
  const [initialFile, setInitialFile] = useState();
  const [initialRevFile, setInitialRevFile] = useState();
  const isValidId = submissionId && !isNaN(Number(submissionId));

  React.useEffect(() => {
    const fetch = () => {
      getSingleSubmission(submissionId)
        .then(async (data) => {
          setSubmission(data);
          setItem(data);

          // setInitialFile(await urlToFile(data.image_url));
          // setInitialRevFile(await urlToFile(data.image_rev_url));
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
    return <Navigate to='/admin/submission' replace={true} />;
  }

  const updateItemFormSubmit = (e) => {
    e.preventDefault();

    const payload = extractUpdatedParts(submission, item);

    if (item.imageBase64) {
      payload.image_base64 = item.imageBase64;
      payload.image_format = item.imageFormat;
    }

    if (item.imageRevBase64) {
      payload.image_rev_base64 = item.imageRevBase64;
      payload.image_rev_format = item.imageRevFormat;
    }

    payload.type = submission.type;

    console.log('update submission payload', payload);
    updateSubmission(submission.id, payload)
    .then((res) => console.log('update submission success', res))
    .catch((err) => {
      console.error('update submission failed', err);
      alert(err);
    });

    e.target.reset();
  };

  const updateItem = (tempItem) => setItem({ ...item, ...tempItem });

  return (
    <div className='create-vaulting-box'>
      <Row className='mb-4'>
        <h2>Edit submission</h2>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1>{submission.id}</h1>
          <p>{`Item Id: ${submission.item_id}, User: ${submission.user}`}</p>
        </Col>
      </Row>
      <Row className='submission_image-upload'>
        <div className='submission_image-upload-overlay'>
          <div className='submission_image-upload-content'>
            {submission.image_url && !item.imageBase64 ? (
              <img src={submission.image_url} width={40} height={80} alt='current front' />
            ) : null}
            <ImageUpload />
            <div className='submission_image-upload-text'>
              <span className='submission_image-upload-text-highlight'>Click to upload front image</span>
            </div>
            <div className='submission_image-upload-text-small'>SVG, PNG, JPG or GIF (max. 800x400px)</div>
          </div>
        </div>
        <ImageUploader
          initialFiles={initialFile ? [initialFile] : undefined}
          onFileChange={(obj) => {
            if (obj) {
              updateItem(obj);
            } else {
              updateItem({
                imageFormat: null,
                imageBase64: null,
              });
            }
          }}
        />
      </Row>
      <Row className='submission_image-upload'>
        <div className='submission_image-upload-overlay'>
          <div className='submission_image-upload-content'>
            {submission.image_rev_url && !item.imageRevBase64 ? (
              <img src={submission.image_rev_url} width={40} height={80} alt='current front' />
            ) : null}
            <ImageUpload />
            <div className='submission_image-upload-text'>
              <span className='submission_image-upload-text-highlight'>Click to upload back image</span>
            </div>
            <div className='submission_image-upload-text-small'>SVG, PNG, JPG or GIF (max. 800x400px)</div>
          </div>
        </div>
        <ImageUploader
          initialFiles={initialRevFile ? [initialRevFile] : undefined}
          onFileChange={(obj) => {
            if (obj) {
              updateItem({
                previewRevUrl: obj.previewUrl,
                imageRevFormat: obj.imageFormat,
                imageRevBase64: obj.imageBase64,
              });
            } else {
              updateItem({
                imageRevFormat: null,
                imageRevBase64: null,
              });
            }
          }}
        />
      </Row>
      <Form onSubmit={updateItemFormSubmit} className='submission_form'>
        <Row className='submission_form-section'>
          <Col xs={12}>
            <Row>
              <Col sm={12} lg={12}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ title: e.target.value })}
                    value={item.title}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ subject: e.target.value })}
                    value={item.subject}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ genre: e.target.value })}
                    value={item.genre}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    onChange={(e) => updateItem({ description: e.target.value })}
                    value={item.description}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Overall grade</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ overall_grade: e.target.value })}
                    value={item.overall_grade}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Sub grades</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ sub_grades: e.target.value })}
                    value={item.sub_grades}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ manufacturer: e.target.value })}
                    value={item.manufacturer}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Grading Company</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ grading_company: e.target.value })}
                    value={item.grading_company}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ serial_number: e.target.value })}
                    value={item.serial_number}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type='number'
                    min={1900}
                    max={2050}
                    value={item.year}
                    onChange={(e) => updateItem({ year: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Estimated value</Form.Label>
                  <Form.Control
                    type='number'
                    min={1}
                    value={item.est_value}
                    onChange={(e) => updateItem({ est_value: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Auto graph</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => updateItem({ autograph: e.target.value })}
                    value={item.autograph}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className='submission_divider'></div>
        <Row className='submission_form-section'>
          <div className='submission_form-button-wrapper'>
            <Button type='reset' bg='transparent' variant='outline-primary' onClick={() => setItem(submission)}>
              Cancel
            </Button>
            <Button type='submit'>Update</Button>
          </div>
        </Row>
      </Form>
    </div>
  );
}

export default AdminEditSubmissionPage;
