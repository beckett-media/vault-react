import React from 'react'
import { Container } from 'react-bootstrap'
import SubmissionHistory from './SubmissionHistory'

const History = () => {
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
      <SubmissionHistory/>
    </Container>
  )
}

export default History