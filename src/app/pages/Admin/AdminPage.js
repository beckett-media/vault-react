import React, { useContext } from 'react';
import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import { ListGroup, Button, Form } from 'react-bootstrap';

import InventoryLocationForm from '../../components/InventoryLocationForm/InventoryLocationForm';
import AdminRow from './AdminRow';
import SubmissionSearch from './SubmissionSearch';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';

import './AdminPage.scss';

import SearchBar from '../../components/SearchBar/SearchBar';
import { AdminPageContext } from '../../contexts/adminPage';

const NewAdmingPage = () => {
  const { submissions } = useContext(AdminPageContext);

  console.log('submissions', submissions);

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
                  {submissions.map((item) => (
                    <AdminRow key={item.item_id} itemId={item.item_id} />
                  ))}
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
