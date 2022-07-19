import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { submissionHistory } from './submissionHistory';
import './History.scss'
import { getUser } from '../../services/user';
import { getHistory } from '../../services/history';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then((userObject) => {
      setUser(userObject);
      getHistory(user.name)
        .then((res) => {
          if (res.statusCode === 200) {
            if (res.data.length !== 0) {
              setHistoryItems(res.data);
            }
          } else {
            setHistoryItems([{
              id: 's0',
              title: 'No historyItems',
              created_at: new Date() }]);
          }
        })
        .catch((err) => {
          setHistoryItems([{ title: err.message, created_at: new Date() }]);
        });
    });
  }, []);
  let items = ([
    ...submissionHistory({historyItems, selected, setSelected})
  ])
  // TODO: Set searching and filtering items.
  const sortedItems = items.sort((a,b)=> {
    if(a.id < b.id){
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