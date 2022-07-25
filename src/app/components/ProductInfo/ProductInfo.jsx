import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './ProductInfo.scss';

import { formatPrice } from '../../utils/strings';
import { createItemListing, updateItemDetails } from '../../services/items';
import { getUser } from '../../services/user';

const ProductInfo = ({ isOwner, item, addToCart }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  const [listItemInitiated, setlistItemInitiated] = useState(false);
  const [name, setName] = useState(item.title);
  const [price, setPrice] = useState(+item.est_value);
  // TODO: Update items to include tags.
  const [newTag, setNewTag] = useState('');

  const listItem = () => {
    if (item.name !== name) {
      updateItemDetails({ ...item, title: name });
    }
    createItemListing({ vaulting_id: item.id, user: user.id, price: price }).then((res) => console.log(res.data));
  };

  useEffect(() => {
    setName(item.title), setPrice(+item.est_value);
  }, [item]);

  return (
    <div className='product-info_component'>
      {listItemInitiated ? (
        <Form>
          <Form.Group>
            <Form.Label>Card Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control value={price} onChange={(e) => setPrice(+e.target.value)} />
          </Form.Group>
          {/* TODO: We need to add tags to the items. */}
          {/* <Form.Group>
            <Form.Label>Add Tag</Form.Label>
            <Form.Control onChange={e => setNewTag(e.target.value)}/>
          </Form.Group> 
          <div className='product-info_tags-wrapper'>
            {item.tags.map((tag, index) => (
              <div className='tag_component' key={index}>
                {tag}
              </div>
            ))}
          </div>*/}
          <br />
          <div className='product-info_buttons-wrapper'>
            <Button
              className='w-100'
              onClick={() => {
                listItem();
              }}
            >
              Save
            </Button>
            <Button className='w-100' variant='outline-dark' onClick={() => setlistItemInitiated(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <div className='product-info_title'>{item.title}</div>
          <div className='product-info_stats'>
            <div>{formatPrice(price)}</div>
            <div>{item.grade ? item.grade : 'Beckett 10'}</div>
          </div>
          {item.tags && (
            <div className='product-info_tags-wrapper'>
              {item.tags.map((tag, index) => (
                <div className='tag_component' key={index}>
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div className='product-info_buttons-wrapper'>
            {isOwner ? (
              <>
                <Button className='w-100' onClick={() => setlistItemInitiated(true)}>
                  Sell in Marketplace
                </Button>
                <Button className='w-100' variant='outline-dark' onClick={() => addToCart()}>
                  Edit Card Details
                </Button>
                <Button className='text-start text-decoration-none' variant='link'>
                  Remove From Beckett Vault
                </Button>
              </>
            ) : (
              <>
                <Button className='w-100' onClick={() => addToCart()}>
                  Buy Now
                </Button>
                <Button className='w-100' variant='outline-dark' onClick={() => addToCart()}>
                  Add To Cart
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
