import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductInfo from '../../components/ProductInfo/ProductInfo';

import { getSingleSubmission } from '../../services/submission';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';
import { useCartContext } from '../../contexts/cart';

import './Item.scss';
import { getImageAssetUrl } from '../../utils/image';

const Item = () => {
  const cartContext = useCartContext();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  const navigate = useNavigate();

  useEffect(() => {
    getSingleSubmission(id)
      .then((data) => setItem(data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
    await cartContext.addItemToCart(item);
    navigate('/cart');
  };

  const isOwner = userState && userState.sub == item.ownerId;
  const imageUrl = getImageAssetUrl(item.image_url);
  const imageRevUrl = getImageAssetUrl(item.image_rev_url);

  return Object.keys(item).length > 0 ? (
    <div className='page-wrapper'>
      <div className='section_item-details'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='item-details_layout'>
              <div className='item-details_content-wrapper'>
                <div className='item-details_image-wrapper'>
                  <div className='flip-card_component'>
                    <div className='flip-card_inner'>
                      <img src={imageUrl} className='flip-card_front' alt={item.title} />
                      <img src={imageRevUrl} className='flip-card_back' alt={item.title} />
                    </div>
                  </div>
                </div>
                <div className='item-details_divider' />
                <div className='item-details_text-wrapper'>
                  <div className='item-details_heading'>{item.description?.length !== 0 && 'Details'}</div>
                  <div className='item-details_description'>{item.description}</div>
                </div>
              </div>
              <div className='item-details_actions-wrapper'>
                <ProductInfo item={item} isOwner={isOwner} addToCart={addToCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Item;
