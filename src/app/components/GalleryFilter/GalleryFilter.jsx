import React from 'react';
import SubmitButton from '../../components/Generic/SubmitButton';
import { BsGrid3X2GapFill, BsList } from 'react-icons/bs';

import Filter from '../Generic/Filter';
import './GalleryFilter.scss';
import { DATE, DATE_REVERSE, EST_VALUE, EST_VALUE_REVERSE, SUBJECT, SUBJECT_REVERSE } from '../../const/FiltersEnums';

const GalleryFilter = ({ isListVisible, listToggleHandler }) => {
  const sortOptions = [
    {value: SUBJECT, title: 'Name A-Z'},
    {value: SUBJECT_REVERSE, title: 'Name Z-A'},
    {value: DATE, title: 'Oldest'},
    {value: DATE_REVERSE, title: 'Newest'},
    {value: EST_VALUE_REVERSE, title: 'Most Expensive'},
    {value: EST_VALUE, title: 'Least Expensive'}
  ]
  return (
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
              <Filter searchVal={searchVal} setSearchVal={setSearchVal} sortBy={sortBy} setSortBy={setSortBy} sortOptions={sortOptions} />
              {selectedItemIds.length > 0 && (
                <div className='d-flex align-items-center'>
                  <div className='me-2'>{selectedItemIds.length} item(s) selected</div>
                  <SubmitButton func={clearSelections} title='Clear' />
                  &nbsp;
                  <SubmitButton id='withdraw' func={withdrawItems} title='Withdraw' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='gallery-filter_divider' />
    </div>
  );
};

export default GalleryFilter;
