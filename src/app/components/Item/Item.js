import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PreviewGallery from '../Shared/PreviewGallery/PreviewGallery';
import { getItem } from '../../services/items';
import { AuthContext } from '../../contexts/auth';
import { getUser } from '../../services/user';
import { useCartContext } from '../../contexts/cart';
import { getMarketItems } from '../../services/items';
import { formatPrice } from '../../utils/strings';

import './Item.scss';

const Item = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useCartContext();
  // this is an array of cognitoAttributes.
  // TODO: make a helper function that tuns this into an object.
  console.log('authContext.attrInfo', authContext.attrInfo);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [user, setUser] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

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

  return (
    <div className='page-wrapper'>
      <div className='section_item-details'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='item-details_layout'>
              <div className='item-details_content-wrapper'>
                <div className='item-details_image-wrapper'>
                  <div className='flip-card_component'>
                    <div className='flip-card_inner'>
                      <img src={item.img} className='flip-card_front' alt={item.title} />
                      <img src={item.imgRev} className='flip-card_back' alt={item.title} />
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
                <div className='product-info_component'>
                  <div className='product-info_title'>{item.title}</div>
                  <div className='product-info_stats'>
                    <div>{formatPrice(item.price)}</div>
                    <div>{item.grade ? item.grade : 'Beckett 10'}</div>
                  </div>
                  <div className='product-info_tags-wrapper'>
                    {item.tags?.map((tag, index) => (
                      <div className='tag_component' key={index}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className='product-info_buttons-wrapper'>
                    <Button className='w-100' onClick={() => addToCart()}>
                      Buy Now
                    </Button>
                    <Button className='w-100' variant='outline-dark' onClick={() => addToCart()}>
                      Add To Cart
                    </Button>
                  </div>
                </div>
                <div className='suggested-purchases_component'>
                  <div className='suggested-purchases_title'>Other sellers on Beckett</div>
                  <div className='suggested-purchases_items-wrapper'>
                    {relatedItems?.slice(0, 4).map((item, index) => (
                      <>
                        <div className='divider--grey'></div>
                        <div className='suggested-purchase_component' key={index}>
                          <div className='suggested-purchase_content-wrapper'>
                            <Link to={`/item/${item.id}`}>
                              <div className='suggested-purchase_title ellipses_wrapper'>
                                <span className='ellipses_child'>{formatPrice(item.price) + ' - ' + item.title}</span>
                              </div>
                            </Link>
                            <div className='suggested-purchase_price'>Sold by: {item?.owner}</div>
                          </div>
                          <div className='suggested-purchase_button-wrapper'>
                            <Button className='w-100 h-100' onClick={() => addToCart()}>
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      {/* <Col className='align-center' md={5} sm={12}>
        <div className='flip-card'>
          <div className='flip-card-inner'>
            <div className='flip-card-front'>
              <img src={item.img} className='shadow-1-strong rounded mb-4 img-fluid' alt={item.title} />
            </div>
            <div className='flip-card-back'>
              <img src={item.imgRev} className='shadow-1-strong rounded mb-4 img-fluid' alt={item.title} />
            </div>
          </div>
        </div>
      </Col>
      <Col className='m-3 info-box' md={5} sm={12}>
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
            <span className='fw-bold'>Date Vaulted: </span> {item.date && moment(item.date).format('MMMM Do YYYY')}
          </p>
        </Row>
        <Row>
          <p className='fs-5'>
            <span className='fw-bold'>Est. Value: </span> ${item.price?.toLocaleString()}
          </p>
        </Row>
        {
          //TODO: Add a Remove from Marketplace button if currently listed.
          user && user.id == item.ownerId ? (
            <>
              <Row className='mt-2'>
                <Col></Col>
                <SubmitButton func={listItem} title='Sell in Marketplace' bg='primary' />
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
              <br />
            </>
          ) : (
            <Row>
              <Button className='' size='sm' onClick={() => addToCart()}>
                Buy
              </Button>
            </Row>
          )
        }
      </Col> */}
    </div>
  );
};

export default Item;
