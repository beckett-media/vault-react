import React, { useEffect, useState } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
import { getTopStories } from '../../services/general';
import StoryCard from '../../components/StoryCard/StoryCard';
import './Homepage.scss';

const Homepage = () => {
  const [topStories, setTopStories] = useState([]);
  useEffect(() => {
    // TODO: throw an error if we can't find the stories?
    getTopStories().then((data) => setTopStories(data));
  }, []);

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
                    nextIcon={<span aria-hidden='true' className='carousel-control-next-icon' />}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </div>
              </Row>
              <Row className='home-content_cards-wrapper gy-4'>
                {topStories.map((story, index) => (
                  <Col key={'home-content_' + index} sm={12} md={4}>
                    <StoryCard title={story.title} body={story.body} cta={story.cta} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
