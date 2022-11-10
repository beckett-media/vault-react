import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ListGroup, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminStatusTracker from './AdminStatusTracker';

import './AdminPage.scss';

import DefaultPage from '../../components/Layout/DefaultPage/DefaultPage';
import AdminRow from './AdminRow';
import SubmissionSearch from './SubmissionSearch';

import { AdminPageContext } from '../../contexts/adminPage';
import { ITEM_TYPE, VAULTING_STATUS } from '../../services/items';
import { getAllSubmissions, SUBMISSION_STATUS } from '../../services/submission';
import Filter from '../../components/Generic/Filter';
import { sortByAttribute } from '../../utils/sort';

const AdminPage = () => {
  const { submissions, isSubmissionsLoading, setSubmissions } = useContext(AdminPageContext);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [filterBy, setFilterBy] = useState('Filter');
  const [noFilterResults, setNoFilterResults] = useState(false);

  useEffect(() => {
    getAllSubmissions().then((res) => {
      setSubmissions(res);
      setFilteredSubmissions(res);
    });
  }, []);

  useEffect(() => {
    const filteredSubmissions = submissions.filter((submission) => {
      if (filterBy === 'new') {
        return submission.status === SUBMISSION_STATUS.Submitted;
      } else if (filterBy === 'in-progress') {
        return submission.status === SUBMISSION_STATUS.Received || submission.status === SUBMISSION_STATUS.Approved;
      } else if (filterBy === 'deleted') {
        return submission.status === SUBMISSION_STATUS.Deleted;
      } else if (filterBy === 'done') {
        return (
          submission.status === SUBMISSION_STATUS.Vaulted ||
          submission.status === SUBMISSION_STATUS.Rejected ||
          submission.status === SUBMISSION_STATUS.Failed
        );
      }
    });
    if (filterBy === 'Filter') {
      setNoFilterResults(false);
      setFilteredSubmissions([...submissions]);
    } else if (!filteredSubmissions.length) {
      setNoFilterResults(true);
      setFilteredSubmissions([...submissions]);
    } else {
      setNoFilterResults(false);
      setFilteredSubmissions([...filteredSubmissions]);
    }
  }, [filterBy, submissions]);

  useEffect(() => {
    document.getElementsByClassName('search-bar_input')[0].value = '';
    getAllSubmissions().then((res) => {
      setSubmissions(res);
      setFilteredSubmissions(res);
    });
  }, [filterBy]);

  const searching = (e) => {
    if (e.target.className === 'mb-0 search-bar_input form-control') {
      document.getElementsByClassName('rounded-pill mb-0 form-select form-select-md')[0].value = 'Filter';
      setFilterBy('Filter');
    }
  };
  const cards = filteredSubmissions
    .filter((item) => item.type === ITEM_TYPE.TRADING_CARD)
    .sort(sortByAttribute('item_id', 'desc'));
  const comics = filteredSubmissions
    .filter((item) => item.type === ITEM_TYPE.COMIC)
    .sort(sortByAttribute('item_id', 'desc'));

  const usersArr = [];
  const numberOfVaulted = submissions.filter((item) => item.status === 5).length;
  const numberOfPending = submissions.length - numberOfVaulted;
  submissions.forEach((item) => {
    return usersArr.includes(item.user) || usersArr.push(item.user);
  });
  const numberOfUsers = usersArr.length;

  return (
    <DefaultPage>
      <div className='page-padding'>
        <div className='container-large d-flex flex-column gap-1 mt-4'>
          <AdminStatusTracker />
          <div className='admin-page_content' onClick={(e) => searching(e)}>
            <SubmissionSearch />
            {submissions.length !== 0 && (
              <div className='admin-page_section-table'>
                {/* <div className='admin-page_batch-actions-wrapper'>
                  <Form.Select disabled className='admin-page_batch-actions-select'>
                    <option value=''>Batch Actions</option>
                  </Form.Select>
                  <Button disabled variant='outline-primary'>
                    Apply
                  </Button>
                  <Badge bg='secondary'>Coming soon</Badge>
                </div> */}
                <div className='admin-page_filter-row'>
                  <div className='admin-page_filter-box'>
                    <Filter
                      setFilterBy={setFilterBy}
                      filterOptions={[
                        { value: 'new', title: 'New' },
                        { value: 'in-progress', title: 'In Progress' },
                        { value: 'done', title: 'Done' },
                      ]}
                    />
                  </div>
                  <div className='admin-page_filter-stats'>
                    <div>Number of Users: {numberOfUsers}</div>
                    <div>Number of Vaulted: {numberOfVaulted}</div>
                    <div>Number of Pending: {numberOfPending}</div>
                  </div>
                </div>
                {noFilterResults && <div className='error'>No Filter Results</div>}
                <div>{filteredSubmissions.length + ' of ' + filteredSubmissions.length} </div>
                <div className='admin-page_table-wrapper'>
                  <ListGroup>
                    <ListGroup.Item className='admin-page_table-row admin-page_table-row--header'>
                      {/* <Form.Check></Form.Check> */}
                      <div className='text-muted text-sm'>Item Image</div>
                      <div>Submission ID</div>
                      <div>Item ID</div>

                      <div>Item Description</div>
                      <div>Status</div>
                      <div>Vault Location</div>
                      <div></div>
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

export default AdminPage;
