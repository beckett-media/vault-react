import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './ProductInfo.scss';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AuthContext } from '../../contexts/auth';
import { createItemListing, updateItemDetails } from '../../services/items';
import { mapCognitoToUser } from '../../services/user';
import { formatPrice } from '../../utils/strings';

const ProductInfo = ({ isOwner, item, addToCart }) => {
  const [listItemInitiated, setlistItemInitiated] = useState(false);
  const [name, setName] = useState(item.title);
  const [price, setPrice] = useState(+item.est_value);
  // TODO: Update items to include tags.
  const [newTag, setNewTag] = useState('');
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);

  const listItem = () => {
    if (item.name !== name) {
      updateItemDetails({ ...item, title: name });
    }
    createItemListing({ vaulting_id: item.id, user: userState.sub, price: price }).then((res) => console.log(res.data));
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
          <div className='product-info_price'>
            <div>{formatPrice(price)}</div>
          </div>
          <div className='product-info_stats'>
            <div>Grade: {item.overall_grade ? item.overall_grade : 'No grade'}</div>
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
                {/* <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <Button className='w-100'>Sell in Marketplace</Button>
                </OverlayTrigger> */}
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <Button className='w-100' variant='outline-dark'>
                    Edit Card Details
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <Button className='text-start text-decoration-none' variant='link'>
                    Remove From Beckett Vault
                  </Button>
                </OverlayTrigger>
              </>
            ) : (
              <>
                {/* <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <Button disabled className='w-100' onClick={() => addToCart()}>
                    Buy Now
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <Button disabled className='w-100' variant='outline-dark' onClick={() => addToCart()}>
                    Add To Cart
                  </Button>
                </OverlayTrigger> */}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
