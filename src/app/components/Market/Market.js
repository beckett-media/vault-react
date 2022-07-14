import React, { useState, useEffect } from 'react';
import { getMarketItems } from '../../services/items';
import Filter from '../Generic/Filter';

import PreviewGallery from '../Shared/PreviewGallery/PreviewGallery';
import StoriesGrid from '../Shared/StoriesGrid/StoriesGrid';

import './Market.scss';
import hero from '../../assets/vault-market-hero.png';
import { getMarketplaceTopStories } from '../../services/general';

const Market = () => {
  document.body.classList.add('market-container');
  const [items, setItems] = useState([]);
  const [marketplaceStoriesData, setMarketplaceStoriesData] = useState([]);

  useEffect(() => {
    getMarketItems().then((data) => setItems(data));
    getMarketplaceTopStories().then((data) => setMarketplaceStoriesData(data));
  }, []);

  return (
    <div className='page-wrapper'>
      <Filter />
      <div className='section_market-hero'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='market-hero_wrapper'>
              <img src={hero} alt='' className='market-hero_image' />
            </div>
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
            <PreviewGallery title={'Basketball'} link={'link'} data={items} />
            <div className='market-categories_spacer'></div>
            <PreviewGallery title={'Baseball'} link={'link'} data={items} />
            <div className='market-categories_spacer'></div>
            <PreviewGallery title={'Football'} link={'link'} data={items} />
            <div className='market-categories_spacer'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
