import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getMarketItems } from '../../services/items';
import { Link } from 'react-router-dom';
import Filter from '../Generic/Filter';
import CardActions from '../Generic/CardActions';
import './market.scss';

const Market = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getMarketItems().then((data) => setItems(data));
  }, []);

  return (
    <Container fluid>
      <Filter />
      <div className='row'>
        {items.map((item) => (
          <div className='col-lg-4 col-md-12 p-4 mb-lg-0' key={item.id}>
            <div className='slab'>
              <img
                src={item.img}
                className='w-100 shadow-1-strong rounded mb-4'
                alt={item.title}
              />
            </div>
            <div className='d-flex justify-content-center'>
              <Link to={`/item/${item.id}`}>{item.title}</Link>
            </div>
            <div className='d-flex justify-content-center'>
              <CardActions />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Market;
