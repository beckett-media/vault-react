import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DisplayImage from '../Shared/DisplayImage/DisplayImage';

import hero from '../../assets/vault-market-hero.png';

const Department = () => {
  const { param } = useParams();
  const [category, setCategory] = useState(param);

  useEffect(() => {});

  return (
    <div className='page-wrapper'>
      <div className='section_department-hero'>
        <div className='page-padding'>
          <div className='container-large'>
            <DisplayImage size={'medium'} image={hero} />
          </div>
        </div>
      </div>
      <div className='section_department-main-gallery'></div>
      <div className='section_department-extended-gallery'>
        <div className='page-padding'>
          <div className='container-large'>
            <DisplayImage size={'medium'} image={hero} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
