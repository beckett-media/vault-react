import React, { useState } from 'react';
import { ButtonGroup, Pagination, ToggleButton, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsGrid3X2GapFill, BsList, BsCheck } from 'react-icons/bs';

import './CollectionGallery.scss';

import ItemCard from '../ItemCard/ItemCard';
import ListItem from '../ListItem/ListItem';
import SubmitButton from '../Generic/SubmitButton';
import SearchBar from '../SearchBar/SearchBar';
import EmptySearch from '../EmptySearch/EmptySearch';

import { useToggle } from '../../hooks/useToggle';
import { useMultiSelect } from '../../hooks/useMultiSelect';
import { usePagination } from '../../hooks/usePagination';
import { SUBJECT } from '../../const/FiltersEnums';
import { ASC, DESC, sortByAttribute } from '../../utils/sort';
import { filterOptions, sortOptions } from '../../const/collectionSortAndFilter';

const CollectionGallery = ({ data }) => {
  //  SEARCH & FILTRATION
  const [sortBy, setSortBy] = useState(SUBJECT);
  const [filterBy, setFilterBy] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const searchValRegex = new RegExp(searchVal.toLowerCase(), 'g');

  const typeFilteredItems = !!filterBy ? data.filter((item) => item.item_type === filterBy - 0) : data;
  const searchFilteredItems = typeFilteredItems.filter((item) => searchValRegex.test(item.title.toLowerCase()));
  const sortedItems = sortBy
    ? searchFilteredItems.sort(sortByAttribute(sortBy.split('-')[0], sortBy.split('-').length > 1 ? DESC : ASC))
    : searchFilteredItems;

  const { selectedItemIds, isSelected, handleItemSelection, clearSelections } = useMultiSelect();
  const { isToggled: isListVisible, toggle: listToggleHandler, setIsToggled: setIsListVisible } = useToggle();
  const { activePage, paginationItems, updatePage } = usePagination(sortedItems);

  return (
    <div className='collection-gallery_component w-100'>
      <div className='gallery-filter_component'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='gallery-filter_layout'>
              <div className='gallery-filter_utility-div'></div>
              <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                sortBy={sortBy}
                setFilterBy={setFilterBy}
                filterOptions={filterOptions}
              />
              <div className='d-flex gap-3'>
                <div className='gallery-filter_toggle-wrapper'>
                  <ButtonGroup size='lg'>
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
                  </ButtonGroup>
                </div>
                <Form.Select
                  className='gallery-filter_grid-select'
                  onChange={(e) => setIsListVisible(!!e.target.value)}
                >
                  <option value=''>Grid view</option>
                  <option value='truthy'>List view</option>
                </Form.Select>
                <Form.Select onChange={(e) => setSortBy(e.target.value)}>
                  <option selected>Sort by</option>
                  {sortOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.title}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='collection-gallery_gallery'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='d-flex gap-2 align-items-center'>
              {data.length > 0 && sortedItems.length > 0 && (
                <div className='collection-gallery_heading'>My Collection</div>
              )}{' '}
              {selectedItemIds.length > 0 && (
                <div className={`gallery-filter_multiselect d-flex align-items-center`}>
                  <div className='me-2'>{selectedItemIds.length} item(s) selected</div>
                  <Button variant='outline-primary' onClick={() => clearSelections()}>
                    Clear
                  </Button>
                  &nbsp;
                  <Button id='withdraw' onClick={() => console.log('success!')}>
                    Withdraw
                  </Button>
                </div>
              )}
            </div>
            {searchVal && sortedItems.length === 0 && data.length > 0 && (
              <div className='w-100 d-flex justify-content-center my-4'>
                <EmptySearch searchTerm={searchVal} clearFunction={() => setSearchVal('')} />
              </div>
            )}
            {data.length > 0 && sortedItems.length > 0 && (
              <div
                className={`collection-gallery_layout ${
                  isListVisible ? 'collection-gallery_layout-list' : 'collection-gallery_layout-grid'
                }`}
              >
                {isListVisible && (
                  <div className='collection_list-item-layout my-2'>
                    <div></div>
                    <div>Item</div>
                    <div>Details</div>
                    <div>Grade</div>
                    <div>Price</div>
                  </div>
                )}
                {(searchVal ? sortedItems : updatePage(sortedItems, activePage))?.map((item, index) => (
                  <div key={'collection-gallery_' + index}>
                    {isListVisible ? (
                      <ListItem item={item} />
                    ) : (
                      <div
                        className={`collection-gallery_card-wrapper ${
                          isSelected(item.id) && 'collection-gallery_card-selected'
                        }`}
                        key={'collection-gallery_' + index}
                      >
                        <div className='collection-gallery_card-overlay'></div>
                        {item.status === 5 && (
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
                        )}
                        <ItemCard item={item} belongsToUser={true} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {data.length > 0 && sortedItems.length > 0 && (
          <div className='collection_pagination'>
            <Pagination>
              <Pagination.Prev />
              {paginationItems}
              <Pagination.Next />
            </Pagination>
          </div>
        )}

        {data.length === 0 && (
          <div className='page-padding mt-4'>
            <div className='container-large'>
              <div className='collection-gallery_empty'>
                <div className='collection-gallery_empty-content'>
                  <div className='collection-gallery_empty-heading'>Welcome to Beckett Vault</div>
                  <div className='collection-gallery_empty-body'>
                    Get started by submitting your items to our concierge by clicking the “Submit Item” button. Complete
                    the form, include the packing list with your items, and send them to Beckett.
                  </div>
                </div>
                <Link to='/submission'>
                  <Button>Submit an Item</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionGallery;
