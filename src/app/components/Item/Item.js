import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import './Item.scss';
import { getItem } from '../../services/items';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitButton from '../Generic/SubmitButton';
import { AuthStatus, AuthContext } from '../../contexts/auth';

const Item = () => {
  const authContext = useContext(AuthContext);
  //this is an array of cognitoAttributes.
  //TODO: make a helper function that tuns this into an object.
  console.log('authContext.attrInfo', authContext.attrInfo);
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    // TODO: throw an error / redirect if we can't find the item?
    getItem(id).then((data) => setItem(data));
  }, []);
  const navigate = useNavigate();
  console.log(item.img);
  const listItem = () => {
    navigate('/market');
  };
  const withdrawItem = () => {
    navigate('/');
  };
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
        <Row>
          <p className='fs-6'>{item.description}</p>
        </Row>
        <Row>
          <br />
          <p className='fs-5'>
            {' '}
            <span className='fw-bold'>Date vaulted: </span>{' '}
            {item.date && moment(item.date).format('MMMM Do YYYY')}
          </p>
        </Row>
        <Row>
          <p className='fs-5'>
            <span className='fw-bold'>Est. Value: </span> $
            {item.price?.toLocaleString()}
          </p>
        </Row>
        {/* TODO: fix this using the new auth */}
        {true ?
          <>
            <Row className='mt-2'>
              <Col></Col>
              <SubmitButton
                func={listItem}
                title='Sell in Marketplace'
                bg='primary'
              />
            </Row>
            <br />
            <Row>
              <SubmitButton
                className='withdraw-btn'
                func={withdrawItem}
                title='Withdraw from Vault'
                bg='outline-primary'
              />
            </Row>
          </>
        ) : (
          <Row>
            <Button className='' size='sm' bg='transparent'>
              Buy
            </Button>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Item;
