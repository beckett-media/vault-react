import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { departmentFilterItems } from '../../const/departmentFilterItems';
import './DepartmentFilter.scss';

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
          <div className='department-filter_item' key={index}>
            {item}
          </div>
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
