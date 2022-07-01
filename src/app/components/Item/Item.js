import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import './Item.scss';
import { getItem } from '../../services/items';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Item = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    // TODO: throw an error / redirect if we can't find the item?
    getItem(id).then((data) => setItem(data));
  }, []);
  console.log(item.img);

  return (
    <Row>
      <Col className='align-center' md={5} sm={12}>
        <div className='flip-card'>
          <div className='flip-card-inner'>
            <div className='flip-card-front'>
              <img
                src={item.img}
                className='shadow-1-strong rounded mb-4 img-fluid'
                alt={item.title}
              />
            </div>
            <div className='flip-card-back'>
              <img
                src={item.imgRev}
                className='shadow-1-strong rounded mb-4 img-fluid'
                alt={item.title}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col className='m-3' md={5} sm={12}>
        <Row>
          <h3>{item.title}</h3>
        </Row>
        <Row>{item.description}</Row>
        <Row>
          <br />
          Vaulted: {item.date && moment(item.date).format('MMMM Do YYYY')}
        </Row>
        <Row>Est. Value: ${item.price}</Row>
        <Row className='mt-3'>
          {user && user.id == item.ownerId ? (
            <>
              <Button size='sm' className='mb-3'>
                Withdraw from Vault
              </Button>
              <Button size='sm'>Sell in Vault</Button>
            </>
          ) : (
            <Button size='sm'>Buy</Button>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Item;
