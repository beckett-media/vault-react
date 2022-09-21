import React, { useContext, useState } from 'react';
import { ListGroup, Button, Form, ListGroupItem } from 'react-bootstrap';

import './AdminPage.scss';

import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import AdminRow from './AdminRow';
import SubmissionSearch from './SubmissionSearch';

import { AdminPageContext } from '../../contexts/adminPage';
import { ITEM_TYPE } from '../../services/items';

const NewAdmingPage = () => {
  const { submissions } = useContext(AdminPageContext);
  console.log('submissions', submissions);

  const cards = submissions
    .filter((item) => item.type === ITEM_TYPE.TRADING_CARD)
    .sort((a, b) => a.item_id - b.item_id);
  const comics = submissions.filter((item) => item.type === ITEM_TYPE.COMIC).sort((a, b) => a.item_id - b.item_id);

  console.log(cards);
  console.log(comics);

  return (
    <DefaultPage>
      <div className='page-padding'>
        <div className='container-large'>
          <div>status tracker component</div>
          <div className='admin-page_content'>
            <SubmissionSearch />

            <div className='admin-page_section-table'>
              <div className='admin-page_batch-actions-wrapper'>
                <Form.Select className='admin-page_batch-actions-select'>
                  <option value=''>Batch Actions</option>
                </Form.Select>
                <Button variant='outline-primary'>Apply</Button>
              </div>
              <div className='admin-page_table-wrapper'>
                <ListGroup>
                  <ListGroup.Item className='admin-page_table-row admin-page_table-row--header'>
                    <Form.Check></Form.Check>
                    <div className='text-muted text-sm'>Item Image</div>
                    <div>Item ID</div>
                    <div>Item Description</div>
                    <div>Status</div>
                    <div>Vault Location</div>
                    <div>Action</div>
                  </ListGroup.Item>
                  {cards.length > 0 && (
                    <>
                      <ListGroup.Item className='d-flex justify-content-center' variant='secondary'>
                        --- Cards ---
                      </ListGroup.Item>
                      {cards.map((item) => (
                        <AdminRow key={'admin_row-' + item.id} item={item} />
                      ))}
                    </>
                  )}
                  {comics.length > 0 && (
                    <>
                      <ListGroup.Item className='d-flex justify-content-center' variant='secondary'>
                        --- Comics ---
                      </ListGroup.Item>
                      {comics.map((item) => (
                        <AdminRow key={'admin_row-' + item.id} item={item} cards={cards} comics={comics} />
                      ))}
                    </>
                  )}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default NewAdmingPage;
