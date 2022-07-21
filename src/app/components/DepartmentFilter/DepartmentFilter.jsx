import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import './DepartmentFilter.scss';
import { departmentFilterItems } from '../../const/departmentFilterItems';

const DepartmentFilter = () => {
  return (
    <div className='department-filter_component'>
      <div className='department-filter_layout'>
        {departmentFilterItems?.map((item, index) => (
          <Link to={`/market/${item.toLocaleLowerCase()}`} key={'department-filter_' + index}>
            <div className='department-filter_item'>{item}</div>
          </Link>
        ))}
        <DropdownButton variant='outline-primary' title='Sort by'>
          {departmentFilterItems?.map((item, index) => (
            <Dropdown.Item
              href={`/market/${item.toLocaleLowerCase()}`}
              className='department-filter_item'
              key={'department-filter_dropdown-' + index}
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};

export default DepartmentFilter;
