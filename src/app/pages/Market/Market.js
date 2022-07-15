import React, { useState, useEffect } from 'react';
import { getMarketItems } from '../../services/items';
import Filter from '../../components/Generic/Filter';

import PreviewGallery from '../../components/PreviewGallery/PreviewGallery';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid';
import DisplayImage from '../../components/DisplayImage/DisplayImage';
import DepartmentFilter from '../../components/DepartmentFilter/DepartmentFilter';

import './Market.scss';
import hero from '../../assets/vault-market-hero.png';
import { getMarketplaceTopStories } from '../../services/general';

const Market = () => {
  const [items, setItems] = useState([]);
  const [marketplaceStoriesData, setMarketplaceStoriesData] = useState([]);

  useEffect(() => {
    getMarketItems().then((data) => setItems(data));
    getMarketplaceTopStories().then((data) => setMarketplaceStoriesData(data));
  }, []);

  return (
    <div className='page-wrapper'>
      <DepartmentFilter />
      <div className='section_market-hero'>
        <div className='page-padding'>
          <div className='container-large'>
            <DisplayImage size='large' image={hero} />
          </div>
        </div>
      </div>
      <div className='section_market-stories'>
        <div className='page-padding'>
          <div className='container-large'>
            <StoriesGrid data={marketplaceStoriesData} />
          </div>
        </div>
      </div>
      <div className='section_market-categories'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='market-categories_spacer'></div>
            <PreviewGallery title={'Basketball'} link={'/market/basketball'} data={items} />
            <div className='market-categories_spacer'></div>
            <PreviewGallery title={'Baseball'} link={'/market/baseball'} data={items} />
            <div className='market-categories_spacer'></div>
            <PreviewGallery title={'Football'} link={'/market/football'} data={items} />
            <div className='market-categories_spacer'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
