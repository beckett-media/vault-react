import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import './DepartmentFilter.scss';
import { departmentFilterItems } from '../../const/departmentFilterItems';

const DepartmentFilter = () => {
  /* 
  TODO: department link removed for DEMO
  <Link to={`/market/${item.toLocaleLowerCase()}`} key={'department-filter_' + index}>
    <div className='department-filter_item'>{item}</div>
  </Link>
  */
  return (
    <div className='department-filter_component'>
      <div className='department-filter_layout'>
        {departmentFilterItems?.map((item, index) => (
          <div className='department-filter_item'>{item}</div>
        ))}
        <DropdownButton variant='outline-primary' title='Sort by'>
          {departmentFilterItems?.map((item, index) => (
            <Dropdown.Item className='department-filter_item' key={'department-filter_dropdown-' + index}>
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};

export default DepartmentFilter;
