import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.scss';

const SearchBar = ({ searchVal, onChange, setFilterBy, filterOptions, isLoading }) => {
  return (
    <div className='d-flex w-100'>
      {!!filterOptions && (
        <Form.Select className='search-bar_filter' onChange={(e) => setFilterBy(e.target.value)}>
          {filterOptions?.map((item, index) => (
            <option key={`search-bar_filter_${index}`} value={item.value}>
              {item.title}
            </option>
          ))}
        </Form.Select>
      )}
      <Form.Control
        className='mb-0 search-bar_input'
        type='search'
        placeholder='Search'
        value={searchVal}
        onChange={onChange}
      ></Form.Control>
      <Button className='search-bar_button'>
        {isLoading ? (
          <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <BsSearch />
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
