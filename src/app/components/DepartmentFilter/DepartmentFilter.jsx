import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import './DepartmentFilter.scss';

const navItems = ['Baseball', 'Cards', 'Boxes', 'Rookie', 'Autograph', 'Memorabilia', 'Modern', 'Vintage'];

const DepartmentFilter = () => {
  return (
    <div className='department-filter_component'>
      <div className='department-filter_layout'>
        {navItems.map((item, index) => (
          <Link to={`/market/${item}`} key={index}>
            <div className='department-filter_item'>{item}</div>
          </Link>
        ))}
        <DropdownButton variant='outline-primary' title='Sort by'>
          {navItems.map((item, index) => (
            <Dropdown.Item className='department-filter_item' key={index}>
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};

export default DepartmentFilter;
