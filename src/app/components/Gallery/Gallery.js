import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormCheck,
  Modal,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addListItem,
  addWithdrawalItem,
  setListForm,
  setSelectedItemId,
  setSelectedItemIds,
  setWithdrawalForm,
  removeSelectedItemIds,
} from '../../state/actions';
import { selectedItemIdsSelector } from '../../state/selectors';
import GenericForm from '../Generic/GenericForm';
import SubmitButton from '../Generic/SubmitButton';
import LeftNav from '../LeftNav/LeftNav';
import Profile from '../Profile/Profile';
import './gallery.scss';
import { GridItemBox, GridItemImg, ListItemBox, ListItemImg, ListOrGridView } from './Gallery.styled';
import { BsGrid3X2GapFill, BsList } from 'react-icons/bs';
import CardActions from '../Generic/CardActions';
import { getItems } from '../../services/items';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [ listView, setListView ] = useState(false);
  const [ withdrawOrList, setWithdrawOrList ] = useState('');
  const [ showConfirm, toggleConfirm ] = useState(false);
  const selectedItemIds = useSelector(selectedItemIdsSelector);
  const [
    showConfirmationPage,
    toggleShowConfirmationPage
  ] = useState(false)
  const toggleListView = () => setListView(!listView)

  const listItem = (evt) => {
    const item = items.filter(item => item.id === evt.target.id)
    dispatch(addListItem(item))
    toggleConfirm(true)
  }

  const listItems = (evt) => {
    setWithdrawOrList(evt.target.id)
    dispatch(setListForm(selectedItemIds))
    toggleShowConfirmationPage(true)
  }

  const withdrawItem  = (evt) => {
    const item = items.filter(item => item.id === evt.target.id)
    dispatch(addWithdrawalItem(item))
    toggleConfirm()
  }

  const withdrawItems  = (evt) => {
    setWithdrawOrList(evt.target.id)
    toggleShowConfirmationPage(true)
  }

  const cancelConfirm = () => toggleConfirm(false)

  const cancelConfirmAction = () => toggleShowConfirmationPage(false)
  const confirmAction = () => {
    withdrawOrList === 'withdraw' ? 
      dispatch(setWithdrawalForm(items.filter(item => selectedIds.includes(item.id)))) :
      dispatch(setListForm(items.filter(item => selectedIds.includes(item.id))))
    toggleShowConfirmationPage(false)
  }
  const clearSelections = () => dispatch(setSelectedItemIds([]))
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);
  const itemBox = items.map((item) => {
    return(
      <>
        <Modal show={showConfirm} onHide={cancelConfirm}>
          <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
          </Modal.Header>
          <p >TEST Modal</p>
          <Button onClick = {() => toggleShowConfirmationPage(true)}>Button</Button>
        </Modal>
        {listView && 
          <ListItemBox>
            <FormCheck 
              onClick={() => !selectedItemIds.ids.includes(item.id) ? 
                dispatch(setSelectedItemId(item.id)) : 
                dispatch(removeSelectedItemIds(item.id))}
              checked={selectedItemIds.ids.includes(item.id)}
            />
            <ListItemImg
              src={item.img}
              alt=""
            />
            <Link to={`/item/${item.id}`}>{item.title}</Link>
            <CardActions />
            <SubmitButton id={item.id} func={listItem} title='List'/>
            {/* <SubmitButton id={item.id} func={withdrawItem} title='Withdraw'/> */}
          </ListItemBox>}
        {!listView && 
          <GridItemBox>
            <FormCheck 
              onClick={() => !selectedItemIds.ids.includes(item.id) ? 
                dispatch(setSelectedItemId(item.id)) : 
                dispatch(removeSelectedItemIds(item.id))}
              checked={selectedItemIds.ids.includes(item.id)}
            />
            
            <Link to={`/item/${item.id}`}>{item.title}</Link>
            <GridItemImg
              src={item.img}
              alt=""
            />
            <Row>
              <CardActions />
              <SubmitButton id={item.id} func={listItem} title='List'/>
              {/* <SubmitButton id={item.id} func={withdrawItem} title='Withdraw'/> */}
            </Row>
          </GridItemBox>}

      </>
    )
  })
  return (
    <Container fluid>
        {!showConfirmationPage && <>
          <Row className="mt-2 col-md-12">
            <Col>
              <SubmitButton func={toggleListView} title={<BsGrid3X2GapFill />} bg={listView ? 'bg-dark border border-dark' : 'bg-primary'} />
              <SubmitButton func={toggleListView} title={<BsList />} bg={!listView ? 'bg-dark border border-dark' : 'bg-primary'} />
            </Col>
            <Col className='float-right'>
              <Profile/>
            </Col>
          </Row>
          <Row>
            {!showConfirmationPage && <>
              <Col>
                <LeftNav />
              </Col>
              <Col>
                <ListOrGridView listView={listView}>{itemBox}</ListOrGridView>
              </Col>
            </>}
            </Row>
          {selectedItemIds.ids.length > 0 && 
            <>
              <SubmitButton func={clearSelections} title='Clear'/>
              <SubmitButton id='withdraw' func={withdrawItems} title='Withdraw'/>
            </>}
        </>}
        {showConfirmationPage && 
          <>
            <GenericForm
              items={items}
              title={`Please confirm you would like to ${withdrawOrList} items below.`}
            />
            <SubmitButton func={confirmAction} title='Confirm'/>
            <SubmitButton func={cancelConfirmAction} title='Go Back'/>
          </>
        }
{/* import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './gallery.scss';
import Filter from '../Generic/Filter';

const Gallery = () => {
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  return (
    <Container fluid>
      <Filter />
      <div className="row m-4">
        {items.map((item) => (
          <div className="col-lg-4 col-md-12 p-4 mb-lg-0" key={item.id}>
            <div className="slab">
              <img
                src={item.img}
                className="w-100 shadow-1-strong rounded mb-4"
                alt={item.title}
              />
            </div>
            <div className="d-flex justify-content-center">
            </div>
            <div className="d-flex justify-content-center">
            </div>
          </div>
        ))}
      </div> */}
    </Container>
  );
};

export default Gallery;
