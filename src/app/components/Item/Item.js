import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './item.scss';
import { getItem } from '../../services/items';
import { useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  console.log('ID', id);
  const [item, setItem] = useState({});
  useEffect(() => {
    getItem(id).then((data) => setItem(data));
  }, []);

  return (
    <Container fluid>
      <div className="row">
        <div className="col">
          <div className="slab">
            <img
              src={item.img}
              className="w-100 shadow-1-strong rounded mb-4"
              alt={item.title}
            />
          </div>
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      </div>
    </Container>
  );
};

export default Item;
