import React, { useEffect, useState } from 'react';
import { Col, Collapse, Container, Row, Carousel } from 'react-bootstrap';

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
  useEffect(() => setOpen(true), []);

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
    //   <InterestForm />
    // </Container>
  );
};

export default Homepage;
