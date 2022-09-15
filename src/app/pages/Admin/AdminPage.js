import React, { useContext } from 'react';
import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import { ListGroup, Button, Form } from 'react-bootstrap';

import InventoryLocationForm from '../../components/InventoryLocationForm/InventoryLocationForm';
import AdminRow from './AdminRow';

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
            <div className='admin-page_section-search'>
              <div className='admin-page_search-wrapper'>
                <div className='admin-page_search-heading'>Look up submission</div>
                <div className='admin-page_search-bar-wrapper'>
                  <SearchBar></SearchBar>
                  <Button variant='link'>I do not have a submission ID</Button>
                </div>
              </div>
            </div>
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
                  {/* v Map goes over here v */}
                  <ListGroup.Item className='admin-page_table-row'>
                    <Form.Check></Form.Check>
                    <div className='d-flex gap-1 align-items-center'>
                      <span>img</span>
                      <PencilIcon />
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      0123456789
                      <PencilIcon />
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      1969 Topps #230 Tom Seaver Baseball BGS 9 $750
                      <PencilIcon />
                    </div>
                    <div>
                      <Form.Select>
                        <option value=''>Status</option>
                      </Form.Select>
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      Unassigned
                      <PencilIcon />
                    </div>
                    <div>
                      <Button className='w-100'>Assign</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className='admin-page_expanded-row'>
                    <div className='admin-page_expanded-row-content'>
                      <InventoryLocationForm></InventoryLocationForm>
                    </div>
                    <div className='divider--grey'></div>
                    <div className='admin-page_expanded-row-buttons'>
                      <Button variant='outline-primary'>Cancel</Button>
                      <Button>Save & Exit</Button>
                    </div>
                  </ListGroup.Item>
                  <AdminRow />
                  <AdminRow />
                  <AdminRow />
                  <AdminRow />
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
