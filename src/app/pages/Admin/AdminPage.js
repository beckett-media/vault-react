import React, { useContext, useState } from 'react';
import { ListGroup, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminStatusTracker from './AdminStatusTracker';

import './AdminPage.scss';

import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import AdminRow from './AdminRow';
import SubmissionSearch from './SubmissionSearch';

import { AdminPageContext } from '../../contexts/adminPage';

const NewAdmingPage = () => {
  const { submissions } = useContext(AdminPageContext);
  console.log('submissions', submissions);

  return (
    <DefaultPage>
      <div className='page-padding'>
        <div className='container-large'>
          <AdminStatusTracker />
          <div className='admin-page_content'>
            <SubmissionSearch />

            <div className='admin-page_section-table'>
              <div className='admin-page_batch-actions-wrapper'>
                <Form.Select disabled className='admin-page_batch-actions-select'>
                  <option value=''>Batch Actions</option>
                </Form.Select>
                <Button disabled variant='outline-primary'>
                  Apply
                </Button>
                <Badge>Coming soon</Badge>
              </div>
              {submissions.length !== 0 && (
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
                    {submissions.map((item) => (
                      <AdminRow key={'admin_row-' + item.id} item={item} />
                    ))}
                  </ListGroup>
                </div>
              )}
            </div>
          </div>
          <div className='admin-page_content'>
            <div className='w-100 d-flex justify-content-center align-items-center gap-3'>
              <span>Or create a new user account</span>
              <Link to='/admin/create-account'>
                <Button>Create new account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default NewAdmingPage;
