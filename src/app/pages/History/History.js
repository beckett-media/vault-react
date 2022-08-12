import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ItemsHistory from './itemsHistory';
import './History.scss';
import { getHistory } from '../../services/history';
import Filter from '../../components/Generic/Filter';
import { getSubmissions } from '../../services/submission';
import { getListings, getVaulting } from '../../services/items';
import { ALL, DATE, DATE_REVERSE, LISTING, NONE, SUBMISSION, VAULTING } from '../../const/FiltersEnums';
import { mapCognitoToUser } from '../../services/user';
import { AuthContext } from '../../contexts/auth';
import { sortByAttribute } from '../../utils/sort';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [sortBy, setSortBy] = useState(DATE_REVERSE);
  const [filterBy, setFilterBy] = useState(ALL);
  const [searchVal, setSearchVal] = useState('');
  const [historyItemDetails, setHistoryItemDetails] = useState({});
  const [sortedItems, setSortedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [listings, setListings] = useState([]);
  const [vaulting, setVaulting] = useState([]);
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  useEffect(() => {
    getHistory(userState.sub).then((res) => {
      setHistoryItems(res.data);
      setSortedItems(res.data);
      setFilteredItems(res.data);
    });
    getSubmissions({ user: userState.sub }).then((res) => {
      console.log(res)
      setSubmissions(res);
    });
    getListings({ user: userState.sub }).then((res) => {
      setListings(res);
    });
    getVaulting({ user: userState.sub }).then((res) => {
      setVaulting(res);
    });
  }, []);

  useEffect(() => {
    if (searchVal?.length) {
      let matches = historyItems.filter((item) => {
        return(
          String(JSON.parse(item.extra).title).toLowerCase().indexOf(String(searchVal).toLowerCase()) !== -1 ||
          String(JSON.parse(item.extra).subject).toLowerCase().indexOf(String(searchVal).toLowerCase()) !== -1 ||
          String(JSON.parse(item.extra).player).toLowerCase().indexOf(String(searchVal).toLowerCase()) !== -1
        )
      });
      let matchById = historyItems.filter((item) => {
        return(
          String(JSON.parse(item.extra).uuid).indexOf(searchVal) !== -1 ||
          item.order_id === searchVal
    )})
      setFilteredItems([...matchById, ...matches]);
    } else {
      setFilteredItems([...historyItems]);
    }
  }, [searchVal]);

  useEffect(() => {
    if (filterBy === ALL) {
      setFilteredItems([...historyItems]);
    } else {
      setFilteredItems([...historyItems.filter((item) => item.entity_type_desc.toLowerCase() === filterBy)]);
    }
  }, [filterBy]);

  useEffect(() => {
    if (sortBy === DATE) {
      setSortedItems([...filteredItems.sort(sortByAttribute('created_at', 'asc'))]);
    } else if (sortBy === DATE_REVERSE) {
      setSortedItems([...filteredItems.sort(sortByAttribute('created_at', 'desc'))]);
    }
  }, [sortBy, filteredItems]);

  const sortOptions = [
    { value: DATE, title: 'Oldest' },
    { value: DATE_REVERSE, title: 'Newest' },
  ];
  const filterOptions = [
    { value: ALL, title: 'All' },
    { value: SUBMISSION, title: 'Submission' },
    { value: VAULTING, title: 'Vaulted' },
    { value: LISTING, title: 'Market' },
  ];

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
        filterOptions={filterOptions}
      />
      <Row>
        <Col xs={9}>
          <h3 className='fs-4'>Title</h3>
        </Col>
        <Col xs={3}>
          <h3 className='fs-4'>Date</h3>
        </Col>
        <Col xs={1} />
      </Row>
      <ItemsHistory sortedItems={sortedItems} listings={listings} submissions={submissions} vaulting={vaulting} />
    </Container>
  );
};

export default History;
