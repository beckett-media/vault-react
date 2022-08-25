import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EmptySearch.scss';

import { ReactComponent as SearchIcon } from '../../assets/empty-search.svg';

const EmptySearch = ({ searchTerm, clearFunction }) => {
  return (
    <div className='empty-search_component'>
      <SearchIcon className='empty-search_icon' />
      <div className='empty-search_heading'>No Results Found</div>
      <div className='empty-search_body'>Your search “{searchTerm}” did not match any items. Please try again.</div>
      <div className='empty-search_button-wrapper'>
        {clearFunction && (
          <Button variant='outline-primary' onClick={() => clearFunction()}>
            Clear Search
          </Button>
        )}
        <Link to='/submission'>
          <Button>+ Add Item</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptySearch;
