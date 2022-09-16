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
    : new Promise(function (resolve) {
        resolve([]);
      });
};

function SubmissionSearch() {
  const [{ results, isSearching }, query, doFilter, setApiRetrigger] = useFilter(querySubmissionApi, null, []);
  const { setSubmissions, submissions } = useContext(AdminPageContext);
  const [isHandlingReceipt, setIsHandlingReceipt] = useState(false);

  const debouncedSearch = React.useMemo(() => debounce((value) => doFilter(value), debounceLimit), [doFilter]);

  const handleInputChange = React.useCallback(
    (e) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  React.useEffect(() => {
    if (!isSearching) {
      setSubmissions(results);
    }
  }, [results, isSearching]);

  const markOrderReceived = () => {
    setIsHandlingReceipt(true);
    submissions.forEach((item) => {
      try {
        confirmSubmissionReceipt(item.item_id, item.type);
      } catch (err) {
        console.log(err);
      }
    });
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
          <SearchBar onChange={handleInputChange}></SearchBar>
          <Button variant='link'>I do not have a submission ID</Button>
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
