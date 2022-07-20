import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, ToggleButton, Pagination } from 'react-bootstrap';
import { BsGrid3X2GapFill, BsList } from 'react-icons/bs';
import { getItems, withdrawItem } from '../../services/items';
import { Link } from 'react-router-dom';

import WithdrawForm from './WithdrawForm';
import SubmitButton from '../../components/Generic/SubmitButton';
import UserInfo from '../../components/UserInfo/UserInfo';
import Filter from '../../components/Generic/Filter';
import ItemCard from '../../components/ItemCard/ItemCard';

import './MyCollection.scss';

import { GridItemBox, ListItemBox, ListItemImg } from './MyCollection.styled';
import { getSubmissions } from '../../services/submission';
import { getUser } from '../../services/user';
import { formatPrice, trimString } from '../../utils/strings';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [listView, setListView] = useState(false);
  const [withdrawOrList, setWithdrawOrList] = useState('');
  const [showConfirm, toggleConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmationPage, toggleShowConfirmationPage] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  const submissionsObj = async () => await getSubmissions(user.name);
  useEffect(() => {
    const fetchSubmissions = async () => submissionsObj().then((res) => setSubmissions(res.data || []));
    user && fetchSubmissions();
  }, [user]);

  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const toggleListView = () => setListView(!listView);
  const isSelected = (id) => selectedItemIds.includes(id);

  const handleItemSelection = (isChecked, id) => {
    if (isChecked) {
      setSelectedItemIds([...selectedItemIds, id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    }
  };

  const searchValRegex = new RegExp(searchVal.toLowerCase(), 'g');

  const filteredItems = items.filter((item) => searchValRegex.test(item.title.toLowerCase()));

  const withdrawItems = (evt) => {
    setWithdrawOrList(evt.target.id);
    toggleShowConfirmationPage(true);
  };

  const cancelConfirm = () => toggleConfirm(false);

  const cancelConfirmAction = () => {
    toggleShowConfirmationPage(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const confirmAction = async () => {
    if (withdrawOrList === 'withdraw') {
      Promise.all([selectedItemIds.map((id) => withdrawItem(id))])
        .then((alls) => {
          console.log('withdraw call result', alls);

          setSelectedItemIds([]);
          toggleShowConfirmationPage(false);

          setSuccessMessage('Withdrawal successful');
        })
        .catch((err) => {
          console.error('withdraw call error', err);
          setErrorMessage('Withdrawal failed');
        });
    } else {
      // List
    }
  };

  const clearSelections = () => {
    setSelectedItemIds([]);
  };

  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  const sortedItems = sortBy
    ? filteredItems.sort((itemA, itemB) => {
        const sortVal = sortBy.split('-');
        const reverse = sortVal.length !== 1;
        if (itemA[`${sortVal[0]}`] <= itemB[`${sortVal[0]}`]) {
          return reverse ? 1 : -1;
        } else return reverse ? -1 : 1;
      })
    : filteredItems;

  const findPaginationCount = (listItems) => {
    return Math.ceil(listItems / 16);
  };

  const paginationItems = [];
  for (let i = 1; i <= findPaginationCount(sortedItems.length); i++) {
    paginationItems.push(<Pagination.Item key={i}>{i}</Pagination.Item>);
  }

  //  Card component
  const itemBox = sortedItems.map((item) => {
    return (
      <div key={item.id}>
        <Modal show={showConfirm} onHide={cancelConfirm}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-center'>Sell this item?</Modal.Title>
          </Modal.Header>
          <p>Would you like to list this item for sale in the marketplace?</p>
          <Button onClick={() => toggleShowConfirmationPage(true)}>Continue</Button>
        </Modal>
        {listView && (
          <ListItemBox>
            <Link to={`/item/${item.id}`} className='w-100'>
              <div className='collection_list-item-layout'>
                <ListItemImg src={item.img} alt='' />
                <div>{trimString(item.title, 20)}</div>
                <div>{trimString(item.description, 50)}</div>
                <div className='text-end'>{item.grade}</div>
                <div className='text-end'>{formatPrice(item.price)}</div>
              </div>
            </Link>
          </ListItemBox>
        )}
        {!listView && (
          <GridItemBox>
            <div className={`${isSelected(item.id) ? 'item-card_selected' : 'item-card_noselect'}`}>
              <ItemCard item={item} />
              <div className='item-card_select-wrapper'>
                <ToggleButton
                  className='w-100'
                  id={`toggle-${item.id}`}
                  type='checkbox'
                  variant='outline-primary'
                  checked={isSelected(item.id)}
                  value='1'
                  onChange={(e) => handleItemSelection(e.currentTarget.checked, item.id)}
                >
                  Select
                </ToggleButton>
              </div>
            </div>
          </GridItemBox>
        )}
      </div>
    );
  });

  //  Page component
  return (
    <div className='page-wrapper'>
      {!showConfirmationPage && (
        <>
          <div className='section-profile-info'>
            <div className='page-padding'>
              <div className='container-large'>
                <UserInfo />
              </div>
            </div>
          </div>
          {!showConfirmationPage && submissions.filter((item) => item.minted_at === 0).length ? (
            <Row>
              <Col>
                <Link to='/history'>
                  <Button>SHOW PENDING ITEMS</Button>
                </Link>
              </Col>
            </Row>
          ) : (
            <></>
          )}

          <div className='section-collection'>
            <div className='gallery-filter_component'>
              <div className='gallery-filter_divider' />
              <div className='page-padding'>
                <div className='container-large'>
                  <div className='gallery-filter_layout'>
                    <div className='gallery-filter_toggle-wrapper'>
                      <SubmitButton
                        func={toggleListView}
                        title={<BsGrid3X2GapFill />}
                        bg={listView ? 'dark border border-dark' : 'primary'}
                      />
                      <SubmitButton
                        func={toggleListView}
                        title={<BsList />}
                        bg={!listView ? 'dark border border-dark' : 'primary'}
                      />
                    </div>
                    <div className='d-flex gap-4'>
                      <Filter searchVal={searchVal} setSearchVal={setSearchVal} sortBy={sortBy} setSortBy={setSortBy} />
                      {selectedItemIds.length > 0 && (
                        <div className='d-flex align-items-center'>
                          <div className='me-2'>{selectedItemIds.length} item(s) selected</div>
                          <SubmitButton func={clearSelections} title='Clear' />
                          &nbsp;
                          <SubmitButton id='withdraw' func={withdrawItems} title='Withdraw' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='gallery-filter_divider' />
            </div>
            {!!successMessage && <p className='mt-2 mb-4 success-message'>{successMessage}</p>}

            <div className='page-padding'>
              <div className='container-large'>
                {listView && (
                  <div className='collection_list-item-layout mt-4 fw-bold'>
                    <div></div>
                    <div>Item</div>
                    <div>Details</div>
                    <div className='text-end'>Grade</div>
                    <div className='text-end'>Price</div>
                  </div>
                )}
                {!showConfirmationPage && (
                  <div className={`gallery_component ${listView ? 'gallery_list' : 'gallery_grid'}`}>{itemBox}</div>
                )}
                <div className='collection_pagination'>
                  <Pagination>
                    <Pagination.Prev />
                    {paginationItems}
                    <Pagination.Next />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showConfirmationPage && (
        <>
          {!!errorMessage && <p className='mt-2 mb-4 error-message'>{errorMessage}</p>}
          <WithdrawForm
            itemsToWithdraw={items.filter((item) => selectedItemIds.includes(item.id))}
            title={`Please confirm you would like to ${withdrawOrList} items below:`}
          />
          <SubmitButton func={confirmAction} title='Confirm' />
          &nbsp;
          <SubmitButton func={cancelConfirmAction} title='Go Back' />
        </>
      )}
    </div>
  );
};

export default Gallery;
