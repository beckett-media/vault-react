import React, { useState } from 'react';
import { Button, Col, Container, FormCheck, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addListItem, addWithdrawalItem, setListForm, setSelectedItemId, setSelectedItemIds, setWithdrawalForm } from '../../state/actions';
import { selectedItemIdsSelector } from '../../state/selectors';
import GenericForm from '../Generic/GenericForm';
import SubmitButton from '../Generic/SubmitButton';
import LeftNav from '../LeftNav/LeftNav';
import Profile from '../Profile/Profile';
import './gallery.scss';
import { GridItemBox, GridItemImg, ListItemBox, ListItemImg, ListOrGridView } from './Gallery.styled';

const Gallery = () => {
  const dispatch = useDispatch();
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
    dispatch(addListItem(evt.target.id))
    toggleConfirm(true)
  }
  const listItems = (evt) => {
    setWithdrawOrList(evt.target.id)
    //dispatch(setListForm(selectedItemIds))
    toggleShowConfirmationPage(true)
  }
  const withdrawItem  = (evt) => {
    dispatch(addWithdrawalItem(evt.target.id))
    toggleConfirm()
  }
  const withdrawItems  = (evt) => {
    setWithdrawOrList(evt.target.id)
    //dispatch(setWithdrawalForm(selectedItemIds))
    toggleShowConfirmationPage(true)
  }
  const cancelConfirm = () => toggleConfirm(false)
  const confirmAction = () => toggleShowConfirmationPage(false)
  const items = [
    {
      id: '0000',
      description: 'test Desc 0000',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG',
    },
    {
      id: '0001',
      description: 'test Desc 0001',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://cdn10.bigcommerce.com/s-omz8v4fn35/product_images/uploaded_images/corners2.png',
    },
    {
      id: '0002',
      description: 'test Desc 0002',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://www.oldsportscards.com/wp-content/uploads/2019/04/1959-Topps-10-Mickey-Mantle-Baseball-Card-Graded-PSA-1.jpg',
    },
    {
      id: '0003',
      description: 'test Desc 0003',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG',
    },
    {
      id: '0004',
      description: 'test Desc 0004',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://miro.medium.com/max/1200/1*JaWyJo7nrnouwmb8FSDD9g.jpeg',
    },
    {
      id: '0005',
      description: 'test Desc 0005',
      serialNumber: '0123456789',
      title: '0000 Example Title',
      path: 'https://pbs.twimg.com/media/FHJ9gdUXIAM58gC.jpg',
    },
  ]
  console.log(selectedItemIds)
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
            <FormCheck onClick={() => !selectedItemIds.ids.includes(item.id) ? 
              dispatch(setSelectedItemId(item.id)) : 
              dispatch(removeSelectedItemIds(item.id))}/>
            <ListItemImg
              src={item.path}
              alt=""
            />
            <div>{item.title}</div>
            <SubmitButton id={item.id} func={listItem} title='List'/>
            <SubmitButton id={item.id} func={withdrawItem} title='Withdraw'/>
          </ListItemBox>}
        {!listView && 
          <GridItemBox>
            <FormCheck onClick={() => !selectedItemIds.ids.includes(item.id) ? 
              dispatch(setSelectedItemId(item.id)) : 
              dispatch(removeSelectedItemIds(item.id))}/>
            <div>{item.title}</div>
            <GridItemImg
              src={item.path}
              alt=""
            />
            <Row>
              <SubmitButton id={item.id} func={listItem} title='List'/>
              <SubmitButton id={item.id} func={withdrawItem} title='Withdraw'/>
            </Row>
          </GridItemBox>}

      </>
    )
  })
  return (
    <Container fluid>
      {!showConfirmationPage && <>
        <SubmitButton func={toggleListView} title='List | Grid'/>
        <Col>
          <Profile/>
          {!showConfirmationPage && <Row>
            <LeftNav />
            <ListOrGridView listView={listView}>{itemBox}</ListOrGridView>
          </Row>}
        </Col>

        <SubmitButton id='list' func={listItems} title='List'/>
        <SubmitButton id='withdraw' func={withdrawItems} title='Withdraw'/>
      </>}
      {showConfirmationPage && 
        <>
          <GenericForm
            items={items}
            title={`Please confirm you would like to ${withdrawOrList} items below.`}
          />
          <SubmitButton func={confirmAction} title='Confirm'/>
        </>
      }
    </Container>
  );
};

export default Gallery;
