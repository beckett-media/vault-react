import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getSubmissions } from '../../services/submission';
import { getUser } from '../../services/user';
import './SubmissionHistory.scss';

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then((userObject) => {
      setUser(userObject);
      getSubmissions(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setSubmissions(res.data);
            }
          } else {
            setSubmissions({ title: 'No submission history', created_at: new Date() });
          }
        })
        .catch((err) => {
          setSubmissions([...submissions, { title: err.message, created_at: new Date() }]);
        });
    });
  }, []);

  return (
    <Container className='py-2 sub-box'>
      <h2 className='fs-3 pb-3'>Submission History</h2>
      <Row>
        <Col xs={8}>
          <h3 className='fs-4'>Title</h3>
        </Col>
        <Col xs={3}>
          <h3 className='fs-4'>Date Created</h3>
        </Col>
        <Col xs={1} />
      </Row>
      {submissions.map((sub) => {
        return (
          <div key={sub.submission_id}>
            <Row className='py-3 border' onClick={() => setSelected(sub.submission_id)}>
              <Col xs={8} className='fw-bold'>
                <div>{sub.title}</div>
              </Col>
              <Col xs={3}>
                <div>{new Date(sub.created_at).toLocaleDateString()} </div>
              </Col>
              <Col xs={1} className='right-align px-4'>
                &and;
              </Col>
            </Row>
            {selected === sub.submission_id && (
              <Row className='py-3 px-5 border'>
                <Col lg={3}>
                  <div>Status: {sub.status_desc}</div>
                </Col>
                <Col lg={5}>
                  <div>Grading Company: {sub.grading_company}</div>
                </Col>
                <Col lg={2}>
                  <div>Serial Number: {sub.serial_number}</div>
                </Col>
              </Row>
            )}
          </div>
        );
      })}
    </Container>
  );
};

export default SubmissionHistory;
