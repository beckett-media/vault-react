import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Item.scss';
import { getItem } from '../../services/items';
import { useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    // TODO: throw an error / redirect if we can't find the item?
    // TODO: fix when it's xs
    getItem(id).then((data) => setItem(data));
  }, []);

  return (
    <Row>
      <Col className='align-center'>
        <img
          src={item.img}
          className='shadow-1-strong rounded mb-4 img-fluid'
          alt={item.title}
        />
      </Col>
      <Col className='m-3'>
        <Row>
          <h3>{item.title}</h3>
        </Row>
        <Row>{item.description}</Row>
        <Row>
          <br />
          {item.date && item.date.toString()}
        </Row>
        <Row>${item.price}</Row>
      </Col>
    </Row>
  );
};

export default Item;
