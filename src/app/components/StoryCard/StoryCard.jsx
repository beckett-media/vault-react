import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './StoryCard.scss';

const StoryCard = ({ title, body, cta }, props) => {
  return (
    <div className='card_component'>
      <div className='card_image-wrapper'></div>
      <div className='card_content-wrapper'>
        <div className='card_text-wrapper'>
          <div className='card_heading'>{title}</div>
          <div className='card_body'>{body}</div>
        </div>
        <div className='card_button-wrapper'>
          <Button variant='outline-primary'>{cta}</Button>
        </div>
      </div>
    </div>
  );
};

StoryCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  cta: PropTypes.string,
};

export default StoryCard;
