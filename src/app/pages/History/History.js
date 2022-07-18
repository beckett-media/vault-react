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
  const [submissions, setSubmissions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
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
            setSubmissions([{
              submission_id: 's0',
              title: 'No submission history',
              created_at: new Date() }]);
          }
        })
        .catch((err) => {
          setSubmissions([...submissions, { title: err.message, created_at: new Date() }]);
        });
        getWithdrawals(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setWithdrawals(res.data);
            }
          } else {
            setWithdrawals([{
              withdrawal_id: 'w0',
              title: 'No withdrawal history', 
              created_at: new Date() 
            }]);
          }
        })
        .catch((err) => {
          setWithdrawals([...withdrawals, { title: err.message, created_at: new Date() }]);
        });
        getSales(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setSales(res.data);
            }
          } else {
            setSales([{
              sale_id: 's1',
              title: 'No sale history', 
              created_at: new Date() 
            }]);
          }
        })
        .catch((err) => {
          setSales([...sales, { title: err.message, created_at: new Date() }]);
        });
        getPurchases(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setPurchases(res.data);
            }
          } else {
            setPurchases([{
              purchase_id: 'p0',
              title: 'No purchase history', 
              created_at: new Date() 
            }]);
          }
        })
        .catch((err) => {
          setPurchases([...purchases, { title: err.message, created_at: new Date() }]);
        });
    });
  }, []);
  let items = ([
    ...submissionHistory({submissions, selected, setSelected}),
    ...withdrawalHistory({withdrawals, selected, setSelected}),
    ...saleHistory({sales, selected, setSelected}),
    ...purchaseHistory({purchases, selected, setSelected}),
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