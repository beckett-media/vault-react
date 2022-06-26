import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './item.scss';
import { getItem } from '../../services/items';
import { useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    // Todo: throw an error / redirect if we can't find the item?
    getItem(id).then((data) => setItem(data));
  }, []);

  return (
    <Container fluid>
      <div className="row">
        <div className="col ">
          <div className="slab d-flex justify-content-center">
            <img
              src={item.img}
              className="shadow-1-strong rounded mb-4 img-fluid"
              alt={item.title}
            />
          </div>
          <div className="d-flex justify-content-center">{item.title}</div>
          <div>{item.description}</div>
        </div>
      </div>
    </Container>
  );
};

export default Item;
