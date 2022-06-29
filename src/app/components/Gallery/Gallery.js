import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormCheck, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addListItem,
  addWithdrawalItem,
  setListForm,
  setSelectedItemId,
  setSelectedItemIds,
  setWithdrawalForm,
  removeSelectedItemId,
} from '../../state/actions';
import { selectedItemIdsSelector } from '../../state/selectors';
import GenericForm from '../Generic/GenericForm';
import SubmitButton from '../Generic/SubmitButton';
import LeftNav from '../Generic/LeftNav';
import ProfileView from '../Profile/ProfileView';
import './Gallery.scss';
import {
  GridItemBox,
  GridItemImg,
  ListItemBox,
  ListItemImg,
  ListOrGridView,
} from './Gallery.styled';
import { BsGrid3X2GapFill, BsList } from 'react-icons/bs';
import CardActions from '../Generic/CardActions';
import { getItems } from '../../services/items';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [listView, setListView] = useState(false);
  const [withdrawOrList, setWithdrawOrList] = useState('');
  const [showConfirm, toggleConfirm] = useState(false);
  const selectedItemIds = useSelector(selectedItemIdsSelector);
  const [showConfirmationPage, toggleShowConfirmationPage] = useState(false);
  const toggleListView = () => setListView(!listView);

  const listItem = (evt) => {
    const item = items.filter((item) => item.id === evt.target.id);
    dispatch(addListItem(item));
    toggleConfirm(true);
  };

  const listItems = (evt) => {
    setWithdrawOrList(evt.target.id);
    dispatch(setListForm(selectedItemIds));
    toggleShowConfirmationPage(true);
  };

  const withdrawItem = (evt) => {
    const item = items.filter((item) => item.id === evt.target.id);
    dispatch(addWithdrawalItem(item));
    toggleConfirm();
  };

  const withdrawItems = (evt) => {
    setWithdrawOrList(evt.target.id);
    toggleShowConfirmationPage(true);
  };

  const cancelConfirm = () => toggleConfirm(false);

  const cancelConfirmAction = () => toggleShowConfirmationPage(false);
  const confirmAction = () => {
    withdrawOrList === 'withdraw'
      ? dispatch(
          setWithdrawalForm(
            items.filter((item) => selectedIds.includes(item.id)),
          ),
        )
      : dispatch(
          setListForm(items.filter((item) => selectedIds.includes(item.id))),
        );
    toggleShowConfirmationPage(false);
  };
  const clearSelections = () => dispatch(setSelectedItemIds([]));
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);
  const itemBox = items.map((item) => {
    return (
      <>
        <Modal show={showConfirm} onHide={cancelConfirm}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
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
              <FormCheck
                onClick={() =>
                  !selectedItemIds.ids.includes(item.id)
                    ? dispatch(setSelectedItemId(item.id))
                    : dispatch(removeSelectedItemId(item.id))
                }
                checked={selectedItemIds.ids.includes(item.id)}
              />
              <ListItemImg src={item.img} alt='' />
            </Col>
            <Col className='p-1'>
              <Link to={`/item/${item.id}`}>{item.title}</Link>
            </Col>
            <Col className='p-1'>
              <CardActions />
            </Col>
            <Col className='p-1'>
              <SubmitButton
                id={item.id}
                func={listItem}
                title='List'
                size='sm'
              />
            </Col>
            <Col className='flex-grow-1'>&nbsp;</Col>
          </ListItemBox>
        )}
        {!listView && (
          <GridItemBox>
            <Col className='justify-content-center mb-1 ml-3'>
              <FormCheck
                onClick={() =>
                  !selectedItemIds.ids.includes(item.id)
                    ? dispatch(setSelectedItemId(item.id))
                    : dispatch(removeSelectedItemId(item.id))
                }
                checked={selectedItemIds.ids.includes(item.id)}
              />

              <Link to={`/item/${item.id}`}>{item.title}</Link>
            </Col>
            <GridItemImg src={item.img} alt='' />
            <Row className='justify-content-center mt-3'>
              <Col className='justify-content-right ml-3'>
                <CardActions />
              </Col>
              <Col>
                <SubmitButton
                  id={item.id}
                  func={listItem}
                  title='List'
                  size='sm'
                />
              </Col>
            </Row>
          </GridItemBox>
        )}
      </>
    );
  });
  return (
    <Container fluid>
      {!showConfirmationPage && (
        <>
          <Row className='mt-2 col-md-12'>
            <Col>
              <SubmitButton
                func={toggleListView}
                title={<BsGrid3X2GapFill />}
                bg={listView ? 'bg-dark border border-dark' : 'bg-primary'}
              />
              <SubmitButton
                func={toggleListView}
                title={<BsList />}
                bg={!listView ? 'bg-dark border border-dark' : 'bg-primary'}
              />
            </Col>
            <Col className='float-right'>
              <ProfileView />
            </Col>
          </Row>
          <Row>
            {!showConfirmationPage && (
              <>
                <Col>
                  <LeftNav />
                </Col>
                <Col>
                  <ListOrGridView listView={listView}>{itemBox}</ListOrGridView>
                </Col>
              </>
            )}
          </Row>
          {selectedItemIds.ids.length > 0 && (
            <>
              <SubmitButton func={clearSelections} title='Clear' />
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
          <GenericForm
            items={items}
            title={`Please confirm you would like to ${withdrawOrList} items below.`}
          />
          <SubmitButton func={confirmAction} title='Confirm' />
          <SubmitButton func={cancelConfirmAction} title='Go Back' />
        </>
      )}
    </Container>
  );
};

export default Gallery;
