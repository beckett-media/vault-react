import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requireContext from 'require-context.macro';

import PreviewGallery from '../../components/PreviewGallery/PreviewGallery';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import SuggestedPurchases from '../../components/SuggestedPurchases/SuggestedPurchases';

import { getItem } from '../../services/items';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';
import { useCartContext } from '../../contexts/cart';
import { getMarketItems } from '../../services/items';

import './Item.scss';

const images = requireContext('../../assets/Images', true);

const Item = () => {
  // see Profile component for creating a user
  const cartContext = useCartContext();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [relatedItems, setRelatedItems] = useState([]);
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);

  useEffect(() => {
    getMarketItems().then((data) => setRelatedItems(data));
  }, []);

  useEffect(() => {
    // TODO: throw an error / redirect if we can't find the item?
    getItem(id).then((data) => setItem(data));
  }, [id]);
  const navigate = useNavigate();

  const listItem = () => {
    navigate('/market');
  };

  const withdrawItem = () => {
    navigate('/');
  };
  const addToCart = async () => {
    await cartContext.addItemToCart(item);
    navigate('/cart');
  };

  const isOwner = userState && userState.sub == item.ownerId;

  return (
    Object.keys(item).length && (
      <div className='page-wrapper'>
        <div className='section_item-details'>
          <div className='page-padding'>
            <div className='container-large'>
              <div className='item-details_layout'>
                <div className='item-details_content-wrapper'>
                  <div className='item-details_image-wrapper'>
                    <div className='flip-card_component'>
                      <div className='flip-card_inner'>
                        <img src={images(`./${item.image_url}`)} className='flip-card_front' alt={item.title} />
                        <img src={images(`./${item.imgRev}`)} className='flip-card_back' alt={item.title} />
                      </div>
                    </div>
                  </div>
                  <div className='item-details_divider' />
                  <div className='item-details_text-wrapper'>
                    <div className='item-details_heading'>Details</div>
                    <div className='item-details_description'>{item.description}</div>
                  </div>
                </div>
                <div className='item-details_actions-wrapper'>
                  <ProductInfo item={item} isOwner={isOwner} addToCart={addToCart} />
                  {/* <SuggestedPurchases data={relatedItems} isOwner={isOwner} addToCart={addToCart} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isOwner && (
          <div className='section_item-related'>
            <div className='page-padding'>
              <div className='container-large'>
                <div className='divider--light' />
                <div className='item-related_gallery-wrapper'>
                  <PreviewGallery data={relatedItems} title={'Related items'} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Item;
