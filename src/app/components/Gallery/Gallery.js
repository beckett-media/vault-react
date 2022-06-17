import React from 'react';
import { Container } from 'react-bootstrap';
import './gallery.scss';

const Gallery = () => {
  return (
    <Container fluid>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <img
            src="https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />

          <img
            src="https://cdn10.bigcommerce.com/s-omz8v4fn35/product_images/uploaded_images/corners2.png"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://www.oldsportscards.com/wp-content/uploads/2019/04/1959-Topps-10-Mickey-Mantle-Baseball-Card-Graded-PSA-1.jpg"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />

          <img
            src="https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://miro.medium.com/max/1200/1*JaWyJo7nrnouwmb8FSDD9g.jpeg"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />

          <img
            src="https://pbs.twimg.com/media/FHJ9gdUXIAM58gC.jpg"
            className="w-100 shadow-1-strong rounded mb-4"
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default Gallery;
