import React, { useContext, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './AdminPage.scss';
import debounce from '../../utils/debounce';
import useFilter from '../../hooks/useFilter';

import SearchBar from '../../components/SearchBar/SearchBar';
import { getSubmissions } from '../../services/submission';
import { AdminPageContext } from '../../contexts/adminPage';
import { SUBMISSION_STATUS } from '../../services/submission';
import { confirmSubmissionReceipt } from '../../services/submission';

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
      </div>
    </div>
  );
}

export default SubmissionSearch;
