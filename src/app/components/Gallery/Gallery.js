import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './gallery.scss';
import { getItems } from '../../services/items';

const Gallery = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  return (
    <Container fluid>
      <div className="row">
        {items.map((item) => (
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0" key={item.id}>
            <div className="slab">
              <img
                src={item.img}
                className="w-100 shadow-1-strong rounded mb-4"
                alt={item.title}
              />
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
