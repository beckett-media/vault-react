import React from 'react';
import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';

import './AdminPage.scss';

import SearchBar from '../../components/SearchBar/SearchBar';

const NewAdmingPage = () => {
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
                      <BsPencil />
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      <div className='ellipses_wrapper'>
                        <div className='ellipses_child'>0123456789</div>
                      </div>
                      <BsPencil />
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      <div className='ellipses_wrapper'>
                        <div className='ellipses_child'>1969 Topps #230 Tom Seaver Baseball BGS 9 $750</div>
                      </div>
                      <BsPencil />
                    </div>
                    <div>
                      <Form.Select>
                        <option value=''>Status</option>
                      </Form.Select>
                    </div>
                    <div className='d-flex gap-1 align-items-center'>
                      <div className='ellipses_wrapper'>
                        <div className='ellipses_child'>Unassigned</div>
                      </div>
                      <BsPencil />
                    </div>
                    <div>
                      <div className='ellipses_wrapper'>
                        <div className='ellipses_child'>
                          <Button className='w-100'>Assign</Button>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
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
