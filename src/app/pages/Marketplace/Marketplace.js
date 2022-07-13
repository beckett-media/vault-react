import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getMarketItems } from '../../services/items';
import { Link } from 'react-router-dom';
import Filter from '../../components/Generic/Filter';
import './Marketplace.scss';

const Marketplace = () => {
  document.body.classList.add('marketplace-container');
  const [items, setItems] = useState([]);
  useEffect(() => {
    getMarketItems().then((data) => setItems(data));
  }, []);

  return (
    <Container>
      <Filter />
      <div className='row'>
        {items.map((item) => (
          <div className='col-lg-4 col-md-12 p-4 mb-lg-0' key={item.id}>
            <div className='slab'>
              <Link to={`/item/${item.id}`}>
                <img src={item.img} className='w-100 shadow-1-strong rounded mb-4' alt={item.title} />
              </Link>
            </div>
            <div className='d-flex justify-content-center'>
              <Link to={`/item/${item.id}`}>{item.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Marketplace;
