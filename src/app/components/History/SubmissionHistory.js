import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getSubmissions } from '../../services/submission';
import { getUser } from '../../services/user';
import './SubmissionHistory.scss';

const SubmissionHistory = () => {
  const [togglePage, setTogglePage] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () =>
      getSubmissions(user.name).then((res) => {
        return setSubmissions(res.data);
      });
    user && fetchSubmissions();
    setTogglePage(true);
  }, [user, togglePage]);

  return (
    <Container className='py-2 sub-box'>
      <div className='fs-3 pb-3'>Submission History</div>
      <Row>
        <Col xs={8}>
          <div className='fs-4'>Title</div>
        </Col>
        <Col xs={3}>
          <div className='fs-4'>Date Created</div>
        </Col>
        <Col xs={1} />
      </Row>
      {submissions &&
        submissions.map((sub) => {
          return (
            <div key={sub.submission_id}>
              <Row
                className='py-3 border'
                onClick={() => setSelected(sub.submission_id)}
              >
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
                  <Col>
                    <div>Status: {sub.status_desc}</div>
                  </Col>
                  <Col>
                    <div>Grading Company: {sub.grading_company}</div>
                  </Col>
                  <Col>
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
