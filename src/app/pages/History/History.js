import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { submissionHistory } from './SubmissionHistory';
import './History.scss'
import { getUser } from '../../services/user';
import { getSubmissions } from '../../services/submission';
import { getWithdrawals } from '../../services/withdrawal';
import { withdrawalHistory } from './WithdrawalHistory';
import { saleHistory } from './SaleHistory';
import { purchaseHistory } from './PurchaseHistory';
import { getSales } from '../../services/sales';
import { getPurchases } from '../../services/purchases';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then((userObject) => {
      setUser(userObject);
      getHistory(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setHistory(res.data);
            }
          } else {
            setHistory([{
              submission_id: 's0',
              title: 'No history',
              created_at: new Date() }]);
          }
        })
        .catch((err) => {
          setHistory([...submissions, { title: err.message, created_at: new Date() }]);
        });
    });
  }, []);
  let items = ([
    ...submissionHistory({submissions, selected, setSelected})
  ])
  // TODO: Set searching and filtering items.
  const sortedItems = items.sort((a,b)=> {
    if(a.key < b.key){
      return -1
    }
    else return 1
  })
  return (
    <Container className='py-2 sub-box'>
      <h2 className='fs-3 pb-3'>History</h2>
      <Row>
        <Col xs={8}>
          <h3 className='fs-4'>Title</h3>
        </Col>
        <Col xs={3}>
          <h3 className='fs-4'>Date Created</h3>
        </Col>
        <Col xs={1} />
      </Row>
      <>{sortedItems}</>
    </Container>
  )
}

export default History