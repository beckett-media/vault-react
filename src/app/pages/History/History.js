import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { itemsHistory } from './itemsHistory';
import './History.scss';
import { getUser } from '../../services/user';
import { getHistory } from '../../services/history';
import Filter from '../../components/Generic/Filter';
import { getSingleSubmission, getSubmissions } from '../../services/submission';
import { fetchItems, fetchItemsByUser, getSingleListing, getSingleVaulting } from '../../services/items';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all')
  const [searchVal, setSearchVal] = useState('');
  const [historyItemDetails, setHistoryItemDetails] = useState({})
  const [sortedItems, setSortedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [submissions, setSubmissions] = useState([])
  useEffect(() => {
    getUser().then((userObject) => {
      setUser(userObject);
      getHistory(userObject.id)
        .then((res) => {
          setHistoryItems(res.data)
          setSortedItems(res.data)
          setFilteredItems(res.data)
        })
      getSubmissions({user: userObject.id})
        .then((res) => {
          setSubmissions(res)
        })
    });
  }, []);

  useEffect(() => {
    let matches = []
    if(searchVal?.length){
      matches = submissions.filter(item => item.title.toLowerCase().search(String(searchVal).toLowerCase()) > 0)
      let items = matches.map(item => item.id)
      let results = historyItems.filter(item => items.includes(Number(item.entity) || String(item.id) === searchVal))
      setFilteredItems([...results])
    }
    else{setSortedItems([...historyItems])}
  },[searchVal])

  useEffect(() => {
    const selectedArr = selected.split('-')
    switch(selectedArr[1]?.toLowerCase()){
      case 'listing':
        getSingleListing(selectedArr[0])
          .then((res) => {
            setHistoryItemDetails(res)
          })
        break;
      case 'submission':
        getSingleSubmission(selectedArr[0])
          .then((res) => {
            setHistoryItemDetails(res)
          })
          break;
      case 'vaulting':
        getSingleVaulting(selectedArr[0])
          .then((res) => {
            setHistoryItemDetails(res)
          })
          break;
    }
  }, [selected]);

  useEffect(() => {
    switch(filterBy){
      case 'all':
        setFilteredItems([...historyItems])
        break;
      case 'listing':
        setFilteredItems(
          historyItems.filter(item => item.entity_type_desc.toLowerCase() === 'listing')
        )
        break;
      case 'submission':
        setFilteredItems(
          historyItems.filter(item => item.entity_type_desc.toLowerCase() === 'submission')
        )
        break;
      case 'vaulting':
        setFilteredItems(
          historyItems.filter(item => item.entity_type_desc.toLowerCase() === 'vaulting')
        )
        break;
    }
}, [filterBy]);

  useEffect(() => {
    if(sortBy === 'date'){
      setSortedItems(filteredItems.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return -1;
        } else return 1;
        }
      ))
    }
    else if(sortBy === 'date-reverse'){
      setSortedItems(filteredItems.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return -1;
        } else return 1;
        }
      ))
    }
  },[sortBy, filteredItems])

  const sortOptions = [
    {value:'date', title: 'Oldest'},
    {value:'date-reverse', title: 'Newest'},
  ]
  const filterOptions = [
    {value: 'all', title: 'All'},
    {value: 'submission', title: 'Submission'},
    {value: 'vaulting', title: 'Vaulted'},
    {value: 'listing', title: 'Market'}
  ]
  let items = [...itemsHistory({ sortedItems, historyItemDetails, setSelected })]
  return (
    <Container className='py-2 sub-box'>
      <h2 className='fs-3 pb-3'>History</h2>
      <Filter 
        searchVal={searchVal} 
        setSearchVal={setSearchVal} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        sortOptions={sortOptions}
        filterBy={filterBy}
        setFilterBy={setFilterBy} 
        filterOptions={filterOptions}/>
      <Row>
        <Col xs={8}>
          <h3 className='fs-4'>Title</h3>
        </Col>
        <Col xs={3}>
          <h3 className='fs-4'>Date Created</h3>
        </Col>
        <Col xs={1} />
      </Row>
      <>{items}</>
    </Container>
  );
};

export default History;
