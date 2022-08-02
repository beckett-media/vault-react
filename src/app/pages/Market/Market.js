import React, { useState, useEffect } from 'react';
import { fetchMarketItems, getItems } from '../../services/items';

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
    getItems().then((res) => {
      if (res.status === 200) {
        return setItems(res.data);
      }
    });
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
      {/* TODO: removed for DEMO
      <div className='section_market-stories'>
        <div className='page-padding'>
          <div className='container-large'>
            <StoriesGrid data={marketplaceStoriesData} />
          </div>
        </div>
      </div>
      */}
      {/* <div className='section_market-categories'>
        <div className='page-padding'>
          {items.length !== 0 && (
            <div className='container-large'>
              <div className='market-categories_spacer'></div>
              <PreviewGallery data={items.slice(0, 4)} />
              <div className='market-categories_spacer'></div>
              <PreviewGallery data={items.slice(4, 8)} />
              <div className='market-categories_spacer'></div>
              <PreviewGallery data={items.slice(8, 12)} />
              <div className='market-categories_spacer'></div>
            </div>
          )}
          {items.length === 0 && (
            <div className='p-5'>
              <h3>Error loading marketplace items</h3>
            </div>
          )}
        </div>
      </div>*/}
    </div>
  );
};

export default Market;
