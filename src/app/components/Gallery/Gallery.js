import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';
import './gallery.scss';
import { ItemBox, ItemImg, ListOrGridView } from './Gallery.styled';

const Gallery = () => {
  const [listView, setListView] = useState(false)
  const toggleListView = () => setListView(!listView)
  const items = [
    {
      path: 'https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG'
    },
    {
      path: 'https://cdn10.bigcommerce.com/s-omz8v4fn35/product_images/uploaded_images/corners2.png'
    },
    {
      path: 'https://www.oldsportscards.com/wp-content/uploads/2019/04/1959-Topps-10-Mickey-Mantle-Baseball-Card-Graded-PSA-1.jpg'
    },
    {
      path: 'https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG'
    },
    {
      path: 'https://miro.medium.com/max/1200/1*JaWyJo7nrnouwmb8FSDD9g.jpeg'
    },
    {
      path: 'https://pbs.twimg.com/media/FHJ9gdUXIAM58gC.jpg'
    },
  ]
  const itemBox = items.map((item) => {
    return(
      <ItemBox>
        <ItemImg
          src={item.path}
          alt=""
        />
      </ItemBox>
    )
  })
  return (
    <Container fluid>
      <SubmitButton func={toggleListView} title='List | Grid'/>
      <div className="row">
          <ListOrGridView listView={listView}>{itemBox}</ListOrGridView>
      </div>
    </Container>
  );
};

export default Gallery;
