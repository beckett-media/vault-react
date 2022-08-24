import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.scss';

const SearchBar = ({ searchVal, setSearchVal, setFilterBy, filterOptions }) => {
  return (
    <div className='d-flex w-100'>
      <Form.Select className='search-bar_filter' onChange={(e) => setFilterBy(e.target.value)}>
        {filterOptions?.map((item, index) => (
          <option key={`search-bar_filter_${index}`} value={item.value}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <Form.Control
        className='mb-0 search-bar_input'
        type='search'
        placeholder='Search'
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      ></Form.Control>
      <Button className='search-bar_button'>
        <BsSearch />
      </Button>
    </div>
  );
};

export default SearchBar;
