import React from 'react';
import { Row, Col } from 'react-bootstrap';

import StoryCard from '../StoryCard/StoryCard';

import './StoriesGrid.scss';

const StoriesGrid = ({ data }, props) => {
  return (
    <Row className='stories-grid_component gy-4'>
      {data.map((story, index) => (
        <Col key={'stories-grid_' + index} sm={12} md={4}>
          <StoryCard title={story.title} body={story.body} cta={story.cta} />
        </Col>
      ))}
    </Row>
  );
};

export default StoriesGrid;
