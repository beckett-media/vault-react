import React from 'react';
import { Link } from 'react-router-dom';

import './ListItem.scss';

import { trimString, formatPrice } from '../../utils/strings';

const ListItem = ({ data }, props) => {
  console.log(data);
  return (
    <div className='list-item_component'>
      <Link to={`/item/${data.id}`} className='w-100'>
        <div className='list-item_layout'>
          <img className='list-item_image' src={data.img} alt='' />
          <div>{trimString(data.title, 20)}</div>
          <div>{trimString(data.description, 50)}</div>
          <div className='text-end'>{data.grade}</div>
          <div className='text-end'>{formatPrice(data.price)}</div>
        </div>
      </Link>
    </div>
  );
};

ListItem.defaultProps = {
  item: {
    id: 1,
    ownerId: 1,
    title: `1933 Goudey Babe Ruth PSA 3  Test for Really Long Title that will not fit on the card`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    img: `https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toString(),
    price: 1200,
    grade: 7.5,
  },
};

export default ListItem;
