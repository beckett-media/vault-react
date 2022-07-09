import React, { useEffect, useState } from 'react';
import { Col, Collapse, Container, Row, Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { resetForm } from '../../state/actions';
// import { initialState } from '../../state/store/rootReducer';
import { validEmail, validPhone } from '../Validation/regex';

import InterestForm from './InterestForm';
import Card from './Card';
import './Homepage.scss';

const cardData = [
  {
    title: 'Top Ten Cards',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Discover More',
  },
  {
    title: 'New Releases',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Shop Now',
  },
  {
    title: 'New Releases',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Shop Now',
  },
];

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, updateFormSubmitted] = useState(false);
  useEffect(() => setOpen(true), []);
  const dispatch = useDispatch();

  const validateForm = (email, phone) => {
    const isValidEmail = validEmail.test(email) && email.length >= 8;
    const isValidPhone = validPhone.test(phone) && phone.length >= 10;

    // Validation to ensure that phone and emails are properly formatted.
    return !isValidEmail && !isValidPhone
      ? console.log('Invalid phone and email.')
      : !isValidPhone
      ? console.log('Invalid phone.')
      : !isValidEmail
      ? console.log('Invalid email.')
      : true;
  };

  const formSubmission = async ({
    email,
    phone,
    checkbox1,
    checkbox2,
    checkbox3,
    checkbox4,
    checkbox5,
    checkbox6,
  }) => {
    const validated = await validateForm(email, phone);
    if (!validated) {
      return;
    }
    // TODO: This is to emulate an API call
    updateFormSubmitted(!formSubmitted);
    alert('success!');
    // This code is stand-in example for the user flow that will exist.
    if (!checkbox1) {
      // dispatch(resetForm({type:'RESET_FORM',interestForm: initialState}))
      window.location.href = 'https://beckett.com';
    } else window.location.reload();
    // here we need to use an async function with a
    // thunk to wait for the last redux action to
    // finish, before firing off the post request
  };
  return (
    <div className='page-wrapper'>
      <section className='section_home-carousel'>
        <div className='page-padding'>
          <div className='container-large'>
            <div className='home-carousel_component'>
              <div className='home-carousel_layout'>
                <div className='home-carousel_carousel-wrapper'>
                  <Carousel
                    className='w-100 h-100'
                    controls={false}
                    nextIcon={
                      <span
                        aria-hidden='true'
                        className='carousel-control-next-icon'
                      />
                    }
                  >
                    <Carousel.Item>
                      <img src='' alt='' />
                      <Carousel.Caption>This is a test</Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src='' alt='' />
                      <Carousel.Caption>This is a test</Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src='' alt='' />
                      <Carousel.Caption>This is a test</Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
                <h1 className='home-carousel_heading'>Beckett Vault</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section_home-content'>
        <div className='page-padding'>
          <div className='container-large'>
            <div fluid className='home-content_layout'>
              <Row className='home-content_content-wrapper'>
                <div className='home-content_heading'>Vault topics</div>
                <div className='home-content_body'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </div>
              </Row>
              <Row className='home-content_cards-wrapper gy-4'>
                {cardData.map((data, index) => (
                  <Col key={index} sm={12} md={4}>
                    <Card title={data.title} body={data.body} cta={data.cta} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </div>

    // <Container>
    //   <Row className='justify-content-md-center mt-2'>
    //     <Collapse in={open} timeout={3000}>
    //       <Col className='title' align='center'>
    //         {'Pioneer the Frontier of Digital & Physical Collectibles'}
    //       </Col>
    //     </Collapse>
    //   </Row>
    //   <Row className='justify-content-md-center mt-1 mb-3'>
    //     <Col className='title' align='center'>
    //       <input
    //         type='button'
    //         className='rounded-pill ghost-btn btn-sm'
    //         value='Begin your Journey'
    //       />
    //     </Col>
    //   </Row>
    //   <InterestForm
    //     formSubmission={formSubmission}
    //     formSubmitted={formSubmitted}
    //   />
    // </Container>
  );
};

export default Homepage;
