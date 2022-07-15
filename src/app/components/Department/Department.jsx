import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DisplayImage from '../Shared/DisplayImage/DisplayImage';
import ItemGallery from '../Shared/ItemGallery/ItemGallery';
import DepartmentFilter from '../Shared/DepartmentFilter/DepartmentFilter';

import './Departments.scss';
import hero from '../../assets/vault-market-hero.png';
import { getMarketItems } from '../../services/items';

const Department = () => {
  const { department } = useParams();
  const [category, setCategory] = useState(department);
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (department) {
      //
    }
  }, [department]);

  useEffect(() => {
    getMarketItems().then((data) => setMarketItems(data));
  }, []);

  return (
    <div className='page-wrapper'>
      <DepartmentFilter />
      <div className='section_department-hero'>
        <div className='page-padding'>
          <div className='container-large'>
            <DisplayImage size={'medium'} image={hero} />
          </div>
        </div>
      </div>
      <div className='section_department-main-gallery'>
        <div className='page-padding'>
          <div className='container-large'>
            <ItemGallery data={marketItems} />
          </div>
        </div>
      </div>
      <div className='section_department-extended-gallery'>
        <div className='page-padding'>
          <div className='container-large'>
            <DisplayImage size={'medium'} image={hero} />
            <ItemGallery data={marketItems} isInfinite={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
