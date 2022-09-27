import React, { useContext } from 'react';
import { ListGroup, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminStatusTracker from './AdminStatusTracker';

import './AdminPage.scss';

import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import AdminRow from './AdminRow';
import SubmissionSearch from './SubmissionSearch';

import { AdminPageContext } from '../../contexts/adminPage';
import { ITEM_TYPE } from '../../services/items';

const NewAdmingPage = () => {
  const { submissions, isSubmissionsLoading } = useContext(AdminPageContext);
  console.log('submissions', submissions);

  const cards = submissions
    .filter((item) => item.type === ITEM_TYPE.TRADING_CARD)
    .sort((a, b) => a.item_id - b.item_id);
  const comics = submissions.filter((item) => item.type === ITEM_TYPE.COMIC).sort((a, b) => a.item_id - b.item_id);

  return (
    <DefaultPage>
      <div className='page-padding'>
        <div className='container-large d-flex flex-column gap-1 mt-4'>
          <AdminStatusTracker step={1} />
          <div className='admin-page_content'>
            <SubmissionSearch />

            {submissions.length !== 0 && (
              <div className='admin-page_section-table'>
                <div className='admin-page_batch-actions-wrapper'>
                  <Form.Select disabled className='admin-page_batch-actions-select'>
                    <option value=''>Batch Actions</option>
                  </Form.Select>
                  <Button disabled variant='outline-primary'>
                    Apply
                  </Button>
                  <Badge bg='secondary'>Coming soon</Badge>
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
                    {isSubmissionsLoading && (
                      <ListGroup.Item className='d-flex justify-content-center'>
                        <Spinner variant='primary' as='span' animation='border' role='status' aria-hidden='true'>
                          <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                      </ListGroup.Item>
                    )}
                    {cards.length > 0 && (
                      <>
                        <ListGroup.Item className='d-flex justify-content-center' variant='secondary'>
                          --- Cards ---
                        </ListGroup.Item>
                        {!isSubmissionsLoading &&
                          cards.map((item) => (
                            <AdminRow key={'admin_row-' + item.id} item={item} cards={cards} comics={comics} />
                          ))}
                      </>
                    )}
                    {!isSubmissionsLoading && comics.length > 0 && (
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
            )}
          </div>
          {submissions.length === 0 && (
            <div className='admin-page_content'>
              <div className='w-100 d-flex justify-content-center align-items-center gap-4'>
                <span className='admin-page_search-heading'>Or create a new user account</span>
                <Link to='/admin/create-account'>
                  <Button>Create new account</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultPage>
  );
};

export default NewAdmingPage;
