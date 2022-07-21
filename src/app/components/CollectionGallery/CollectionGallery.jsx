import React, { useState } from 'react';
import { Pagination, ToggleButton } from 'react-bootstrap';
import { BsGrid3X2GapFill, BsList, BsCheck } from 'react-icons/bs';

import './CollectionGallery.scss';

import ItemCard from '../ItemCard/ItemCard';
import ListItem from '../ListItem/ListItem';
import SubmitButton from '../Generic/SubmitButton';
import Filter from '../Generic/Filter';

import { useToggle } from '../../hooks/useToggle';
import { useMultiSelect } from '../../hooks/useMultiSelect';
import { usePagination } from '../../hooks/usePagination';

const CollectionGallery = ({ data }) => {
  //  SEARCH & FILTRATION
  const [sortBy, setSortBy] = useState('title');
  const [searchVal, setSearchVal] = useState('');

  const searchValRegex = new RegExp(searchVal.toLowerCase(), 'g');

  const filteredItems = data.filter((item) => searchValRegex.test(item.title.toLowerCase()));

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
  const { selectedItemIds, isSelected, handleItemSelection, clearSelections } = useMultiSelect();

  //  LIST VIEW TOGGLE
  const { isToggled: isListVisible, toggle: listToggleHandler } = useToggle();

  //  PAGINATION
  const { activePage, paginationItems, updatePage } = usePagination(sortedItems);

  return (
    <div className='w-100'>
      <div className='gallery-filter_component'>
        <div className='gallery-filter_divider' />
        <div className='page-padding'>
          <div className='container-large'>
            <div className='gallery-filter_layout'>
              <div className='gallery-filter_toggle-wrapper'>
                <SubmitButton
                  func={listToggleHandler}
                  title={<BsGrid3X2GapFill />}
                  bg={isListVisible ? 'dark border border-dark' : 'primary'}
                />
                <SubmitButton
                  func={listToggleHandler}
                  title={<BsList />}
                  bg={!isListVisible ? 'dark border border-dark' : 'primary'}
                />
              </div>
              <div className='d-flex gap-4'>
                <Filter searchVal={searchVal} setSearchVal={setSearchVal} sortBy={sortBy} setSortBy={setSortBy} />
                {selectedItemIds.length > 0 && (
                  <div className='d-flex align-items-center'>
                    <div className='me-2'>{selectedItemIds.length} item(s) selected</div>
                    <SubmitButton func={clearSelections} title='Clear' />
                    &nbsp;
                    <SubmitButton id='withdraw' func={() => console.log('success!')} title='Withdraw' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='gallery-filter_divider' />
      </div>
      <div className='page-padding'>
        <div className='container-large'>
          <div
            className={`collection-gallery_layout ${
              isListVisible ? 'collection-gallery_layout-list' : 'collection-gallery_layout-grid'
            }`}
          >
            {isListVisible && (
              <div className='collection_list-item-layout mt-4 fw-bold'>
                <div></div>
                <div>Item</div>
                <div>Details</div>
                <div className='text-end'>Grade</div>
                <div className='text-end'>Price</div>
              </div>
            )}
            {(searchVal ? sortedItems : updatePage(sortedItems, activePage)).map((item, index) => (
              <>
                {isListVisible && <ListItem data={item} key={'collection-gallery_' + index} />}
                {!isListVisible && (
                  <div
                    className={`collection-gallery_card-wrapper ${
                      isSelected(item.id) && 'collection-gallery_card-selected'
                    }`}
                    key={'collection-gallery_' + index}
                  >
                    <div className='collection-gallery_card-overlay'></div>
                    <div
                      className={`collection-gallery_overlay-button ${
                        isSelected(item.id) && 'collection-gallery_overlay-button-selected'
                      }`}
                    >
                      <BsCheck size={40} />
                      <ToggleButton
                        className='collection-gallery_overlay-toggle'
                        id={`toggled-${item.id}`}
                        type='checkbox'
                        variant='outline-primary'
                        checked={isSelected(item.id)}
                        value='1'
                        onChange={(e) => handleItemSelection(e.currentTarget.checked, item.id)}
                      />
                    </div>
                    <ItemCard data={item} />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className='collection_pagination'>
        <Pagination>
          <Pagination.Prev />
          {paginationItems}
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
};

export default CollectionGallery;
