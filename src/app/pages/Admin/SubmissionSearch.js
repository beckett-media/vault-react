import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './AdminPage.scss';
import debounce from '../../utils/debounce';
import useFilter from '../../hooks/useFilter';

import SearchBar from '../../components/SearchBar/SearchBar';
import { getAllSubmissions, getSubmissions, updateSubmission } from '../../services/submission';
import { AdminPageContext } from '../../contexts/adminPage';
import { SUBMISSION_STATUS } from '../../services/submission';
import { confirmSubmissionReceipt } from '../../services/submission';
import { BsTrash } from 'react-icons/bs';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { ITEM_OR_ORDER } from './const';

const debounceLimit = 800; // 800ms

const querySubmissionApi = (query) => {
  return query
    ? getSubmissions({
        submissionOrderIds: [query],
      })
    : getAllSubmissions();
};

function SubmissionSearch() {
  const [{ results, isSearching }, , doFilter, setApiRetrigger] = useFilter(querySubmissionApi, null, []);
  const { setSubmissions, submissions, setIsSubmissionsLoading, isSubmissionsLoading } = useContext(AdminPageContext);
  const [isHandlingReceipt, setIsHandlingReceipt] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [allSubmissionsLength, setAllSubmissionsLength] = useState(0);

  useLayoutEffect(() => {
    const element = document.getElementById('delete-order-btn');
    element.classList.remove('btn-primary');
  });

  useEffect(() => {
    if (submissions.length > allSubmissionsLength) {
      setAllSubmissionsLength(submissions.length);
    }
  }, [submissions]);

  const debouncedSearch = React.useMemo(() => debounce((value) => doFilter(value), debounceLimit), [doFilter]);

  const handleInputChange = React.useCallback(
    (e) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  React.useEffect(() => {
    if (isSearching) {
      setIsSubmissionsLoading(true);
    }
    if (!isSearching) {
      setSubmissions(results);
      setIsSubmissionsLoading(false);
    }
  }, [results, isSearching]);

  const markOrderReceived = async () => {
    setIsHandlingReceipt(true);
    Promise.all(
      submissions.map((item) => {
        confirmSubmissionReceipt(item.item_id, item.type);
      }),
    ).catch((e) => 'Error confirming receipt');
    setTimeout(() => {
      setApiRetrigger([]);
      setIsHandlingReceipt(false);
    }, 2000);
  };
  const deleteOrder = async () => {
    Promise.all(
      submissions.map((item) => {
        updateSubmission(item.item_id, { is_active: false });
      }),
    ).catch((e) => 'Error confirming receipt');
    setTimeout(() => {
      setApiRetrigger([]);
      setIsHandlingReceipt(false);
    }, 2000);
  };

  const receivedItems = submissions.filter((item) => item.status >= SUBMISSION_STATUS.Received);

  return (
    <div className='admin-page_section-search'>
      <div className='admin-page_search-wrapper'>
        <div className='admin-page_search-heading'>Look up submission</div>
        <div className='admin-page_search-bar-wrapper'>
          <SearchBar onChange={handleInputChange} isLoading={isSubmissionsLoading}></SearchBar>
        </div>
        {submissions.length > 0 && receivedItems.length === 0 && (
          <Button className='align-self-start' onClick={markOrderReceived}>
            {isHandlingReceipt ? (
              <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              'Mark Order As Received'
            )}
          </Button>
        )}
        <DeleteConfirmationModal
          itemOrOrder={ITEM_OR_ORDER.ORDER}
          confirmDelete={confirmDelete}
          id={results?.[0]?.order_id}
          setConfirmDelete={setConfirmDelete}
          deleteOrder={deleteOrder}
        />
        {
          <div className={(!results.length || results.length === allSubmissionsLength) && 'hidden'}>
            <Button
              id={'delete-order-btn'}
              className={`w-8 admin-row_delete-button`}
              onClick={() => setConfirmDelete(true)}
            >
              <BsTrash />
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

export default SubmissionSearch;
