import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import './AdminPage.scss';
import debounce from '../../utils/debounce';
import useFilter from '../../hooks/useFilter';

import SearchBar from '../../components/SearchBar/SearchBar';
import { getSubmissions } from '../../services/submission';
import { AdminPageContext } from '../../contexts/adminPage';

const debounceLimit = 800; // 800ms

const querySubmissionApi = (query) => {
  return getSubmissions({
    submissionOrderIds: [query],
  });
};

function SubmissionSearch() {
  const [{ results, isSearching }, query, doFilter] = useFilter(querySubmissionApi, null, []);
  const { setSubmissions } = useContext(AdminPageContext);

  const debouncedSearch = React.useMemo(() => debounce((value) => doFilter(value), debounceLimit), [doFilter]);

  const handleInputChange = React.useCallback(
    (e) => {
      e.persist(); // https://fb.me/react-event-pooling
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  React.useEffect(() => {
    if (!isSearching) {
      setSubmissions(results);
    }
  }, [results, isSearching]);

  return (
    <div className='admin-page_section-search'>
      <div className='admin-page_search-wrapper'>
        <div className='admin-page_search-heading'>Look up submission</div>
        <div className='admin-page_search-bar-wrapper'>
          <SearchBar onChange={handleInputChange}></SearchBar>
          <Button variant='link'>I do not have a submission ID</Button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSearch;
