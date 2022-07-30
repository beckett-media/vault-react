import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { itemsHistory } from './itemsHistory';
import './History.scss';
import { getUser } from '../../services/user';
import { getHistory } from '../../services/history';
import Filter from '../../components/Generic/Filter';
import { getSingleSubmission } from '../../services/submission';
import { getSingleListing, getSingleVaulting } from '../../services/items';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState({});
  const [sortBy, setSortBy] = useState('subject');
  const [searchVal, setSearchVal] = useState('');
  const [historyItemDetails, setHistoryItemDetails] = useState({})

  useEffect(() => {
    getUser().then((userObject) => {
      setUser(userObject);
      getHistory(userObject.id)
        .then((res) => {
              setHistoryItems(res.data)
        })
    });
  }, []);

  useEffect(() => {
      const selectedArr = selected.split('-')
      console.log(selectedArr)
      switch(selectedArr[1]?.toLowerCase()){
        case 'submission':
          getSingleSubmission(selectedArr[0])
            .then((res) => {
              setHistoryItemDetails(res)
            })
        case 'listing':
          getSingleListing(selectedArr[0])
            .then((res) => {
              setHistoryItemDetails(res)
            })
        case 'listing':
          getSingleVaulting(selectedArr[0])
            .then((res) => {
              setHistoryItemDetails(res)
            })
      }
  }, [selected]);

  let items = [...itemsHistory({ historyItems, historyItemDetails, setSelected })];
  // TODO: Set searching and filtering items.
  const sortedItems = items.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else return 1;
  });
  const sortOptions = [
    {value:'subject', title: 'Name A-Z'},
    {value:'subject-reverse', title: 'Name Z-A'},
    {value:'date', title: 'Oldest'},
    {value:'date-reverse', title: 'Newest'},
    {value:'est_value-reverse', title: 'Most Expensive'},
    {value:'est_value', title: 'Least Expensive'}
  ]
  return (
    <Container className='py-2 sub-box'>
      <h2 className='fs-3 pb-3'>History</h2>
      <Filter searchVal={searchVal} setSearchVal={setSearchVal} sortBy={sortBy} setSortBy={setSortBy} sortOptions={sortOptions}/>
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
  );
};

export default History;
