import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { fetchItems, withdrawItem } from '../../services/items';
import VaultingItem from './VaultingItem';

const VaultingPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetch = () => {
      fetchItems().then((data) => {
        setItems(data);
      });
    };

    fetch();
  }, []);

  const handleWithdrawClick = (id) => {
    withdrawItem(id)
      .then((data) => {
        setItems(items.map((item) => (item.id === id ? data : item)));
      })
      .catch((e) => {
        console.error(`withdraw error`, e);
        alert(e.message);
      });
  };

  return (
    <div className='page-wrapper'>
      <Row>
        {items.map((item, index) => (
          <Col key={index} className='col-sm-12 col-md-6'>
            <VaultingItem
              item={item}
              onWithdraw={handleWithdrawClick}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VaultingPage;
