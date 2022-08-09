import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { itemsHistory } from './itemsHistory';
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
    let matches = [];
    if (searchVal?.length) {
      let allItems = [...submissions, ...listings, ...vaulting];
      matches = allItems.filter((item) => item.title.toLowerCase().search(String(searchVal).toLowerCase()) > 0);
      let items = matches.map((item) => item.id);
      let matchById = historyItems.filter((item) => String(item.id) === searchVal);
      let results = [];
      if (matchById.length) {
        results = [...matchById];
      } else {
        results = [...historyItems.filter((item) => items.includes(Number(item.entity)))];
      }
      setFilteredItems([...results]);
    } else {
      setFilteredItems([...historyItems]);
    }
  }, [searchVal]);

  useEffect(() => {
    const selectedArr = selected.split('-');
    if (selectedArr?.[0] === String(historyItemDetails?.id)) {
      setHistoryItemDetails({ ...historyItemDetails });
    } else {
      switch (selectedArr[1]?.toLowerCase()) {
        case 'listing':
          setHistoryItemDetails(listings.filter((listing) => String(listing.id) === selectedArr[0])[0]);
          break;
        case 'submission':
          setHistoryItemDetails(submissions.filter((submission) => String(submission.id) === selectedArr[0])[0]);
          break;
        case 'vaulting':
          setHistoryItemDetails(vaulting.filter((vaulting) => String(vaulting.id) === selectedArr[0])[0]);
          break;
      }
    }
  }, [selected]);

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

  let items = selected.length
    ? [...itemsHistory({ sortedItems, selected, setSelected, historyItemDetails })]
    : [...itemsHistory({ sortedItems, selected, setSelected, historyItemDetails: [{}] })];

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
