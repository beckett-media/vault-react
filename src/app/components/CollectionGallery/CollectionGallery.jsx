import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

import './CollectionGallery.scss';

import ItemCard from '../ItemCard/ItemCard';
import ListItem from '../ListItem/ListItem';
import GalleryFilter from '../GalleryFilter/GalleryFilter';
import useToggle from '../../hooks/useToggle';

const CollectionGallery = ({ data }) => {
  //  SEARCH & FILTRATION
  const [sortBy, setSortBy] = useState('title');
  const [searchVal, setSearchVal] = useState('');

  const searchValRegex = new RegExp(searchVal.toLowerCase(), 'g');

  const filteredItems = items.filter((item) => searchValRegex.test(item.title.toLowerCase()));

  const sortedItems = sortBy
    ? filteredItems.sort((itemA, itemB) => {
        const sortVal = sortBy.split('-');
        const reverse = sortVal.length !== 1;
        if (itemA[`${sortVal[0]}`] <= itemB[`${sortVal[0]}`]) {
          return reverse ? 1 : -1;
        } else return reverse ? -1 : 1;
      })
    : filteredItems;

  // MULTISELECT
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const isSelected = (id) => selectedItemIds.includes(id);

  const handleItemSelection = (isChecked, id) => {
    if (isChecked) {
      setSelectedItemIds([...selectedItemIds, id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    }
  };

  const clearSelections = () => {
    setSelectedItemIds([]);
  };

  //  LIST VIEW TOGGLE
  const { isToggled: isListVisible, toggle: toggleListView } = useToggle();

  console.log(useToggle());
  console.log(isListVisible);

  //  PAGINATION
  const findPaginationCount = (totalItemCount, totalItemsPerPage) => {
    return Math.ceil(totalItemCount / totalItemsPerPage);
  };

  const paginationItems = [];
  for (let i = 1; i <= findPaginationCount(sortedItems.length, 16); i++) {
    paginationItems.push(<Pagination.Item key={i}>{i}</Pagination.Item>);
  }

  return (
    <>
      <GalleryFilter isListVisible={isListVisible} listToggleHandler={toggleListView} />
      <div className='divider'></div>
      <div
        className={`collection-gallery_layout ${
          isListVisible ? 'collection-gallery_layout-list' : 'collection-gallery_layout-grid'
        }`}
      >
        {data.map((item, index) => (
          <>
            {isListVisible && <ListItem data={item} key={'collection-gallery_' + index} />}
            {!isListVisible && <ItemCard data={item} key={'collection-gallery_' + index} />}
          </>
        ))}
      </div>
      <div className='collection_pagination'>
        <Pagination>
          <Pagination.Prev />
          {paginationItems}
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  );
};

export default CollectionGallery;
