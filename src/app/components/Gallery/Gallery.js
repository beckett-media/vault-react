import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  ToggleButton,
} from 'react-bootstrap';
import WithdrawForm from './WithdrawForm';
import SubmitButton from '../Generic/SubmitButton';
import ProfileView from '../Profile/ProfileView';
import Filter from '../Generic/Filter';
import './Gallery.scss';
import {
  GridItemBox,
  ListItemBox,
  ListItemImg,
  ListOrGridView,
} from './Gallery.styled';
import { BsGrid3X2GapFill, BsList } from 'react-icons/bs';
import { getItems } from '../../services/items';
import { Link } from 'react-router-dom';
import { withdrawItem } from '../../services/withdraw';

const Gallery = () => {
  document.body.classList.add('gallery-container');
  const [items, setItems] = useState([]);
  const [listView, setListView] = useState(false);
  const [withdrawOrList, setWithdrawOrList] = useState('');
  const [showConfirm, toggleConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmationPage, toggleShowConfirmationPage] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [sortBy, setSortBy] = useState('title');
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

  const filteredItems = items.filter((item) =>
    searchValRegex.test(item.title.toLowerCase()),
  );

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
      Promise.all([
        selectedItemIds.map((id) => withdrawItem(id)),
      ])
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

  const itemBox = sortedItems.map((item) => {
    return (
      <>
        <Modal key={item.id} show={showConfirm} onHide={cancelConfirm}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-center'>
              Sell this item?
            </Modal.Title>
          </Modal.Header>
          <p>Would you like to list this item for sale in the marketplace?</p>
          <Button onClick={() => toggleShowConfirmationPage(true)}>
            Continue
          </Button>
        </Modal>
        {listView && (
          <ListItemBox className='d-flex col-lg-8'>
            <Col className='p-1 flex-shrink-1'>
              <Link to={`/item/${item.id}`}>
                <ListItemImg src={item.img} alt='' />
              </Link>
            </Col>
            <Col className='p-1'>
              <Link to={`/item/${item.id}`}>{item.title}</Link>
            </Col>
          </ListItemBox>
        )}
        {!listView && (
          <GridItemBox>
            <Card className={`dark ${isSelected(item.id) ? 'card-selected' : 'card-noselect'}`}>
              <Card.Header className='card-hdr'>
                <Link to={`/item/${item.id}`}>
                  <Card.Title className='fs-6'>
                    {
                      // Logic to split title longer than 33 char and append ... to it.
                      item.title.length > 33
                        ? item.title.slice(
                            0,
                            item.title.slice(0, 34).lastIndexOf(' '),
                          ) + ' ...'
                        : item.title
                    }
                  </Card.Title>
                </Link>
              </Card.Header>
              <Card.Body>
                <Link to={`/item/${item.id}`}>
                  <Card.Img
                    className='card-img'
                    variant='top'
                    src={item.img}
                    alt=''
                  />
                </Link>
                <ToggleButton
                  className="mt-2 w-100"
                  id={`toggle-${item.id}`}
                  type="checkbox"
                  variant="outline-primary"
                  checked={isSelected(item.id)}
                  value="1"
                  onChange={(e) => handleItemSelection(e.currentTarget.checked, item.id)}
                >
                  Select
                </ToggleButton>
              </Card.Body>
            </Card>
          </GridItemBox>
        )}
      </>
    );
  });

  return (
    <Container>
      {!showConfirmationPage && (
        <>
          <Row className='mt-2 col-md-12'>
            <Col md={8}></Col>
            <Col className='m-3'>
              <ProfileView />
            </Col>
          </Row>
          <Row className='m-3'>
            <hr />
          </Row>
          <Row className='mt-2 col-md-12'>
            <Col sm={2}>
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
            </Col>
            <Col sm={9}>
              <Filter
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </Col>
          </Row>

          {
            !!successMessage && (
              <p className='mt-2 mb-4 success-message'>{successMessage}</p>
            )
          }

          <Row>
            {!showConfirmationPage && (
              <>
                <Col>
                  <ListOrGridView listView={listView}>{itemBox}</ListOrGridView>
                </Col>
              </>
            )}
          </Row>
          {selectedItemIds.length > 0 && (
            <>
              <SubmitButton func={clearSelections} title='Clear' />&nbsp;
              <SubmitButton
                id='withdraw'
                func={withdrawItems}
                title='Withdraw'
              />
            </>
          )}
        </>
      )}
      {showConfirmationPage && (
        <>
          {
            !!errorMessage && (
              <p className='mt-2 mb-4 error-message'>{errorMessage}</p>
            )
          }
          <WithdrawForm
            itemsToWithdraw={
              items.filter((item) => selectedItemIds.includes(item.id))
            }
            title={
              `Please confirm you would like to ${withdrawOrList} items below:`
            }
          />
          <SubmitButton func={confirmAction} title='Confirm' />&nbsp;
          <SubmitButton func={cancelConfirmAction} title='Go Back' />
        </>
      )}
    </Container>
  );
};

export default Gallery;
