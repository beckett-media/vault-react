import { Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';

const EditImageRow = ({ tempState, item, error, setTempState, updateImage }) => {
  const imageUrlLast = item?.image_url?.split('/').at(-1);
  const imageRevUrlLast = item?.image_rev_url?.split('/').at(-1);
  return (
    <Row>
      <Col className='img_container'>
        <div>Front Image</div>
        <Input
          placeholder='- Front -'
          value={tempState.image_url}
          onChange={(e) => setTempState({ image_url: e.target.value })}
        />
        {item.image_url && (
          <>
            <img className='img_image' src={item.image_url} />
            <div className='img_delete'>
              <TiDelete className='img_delete-icon' onClick={() => updateImage('del-image_url')} />
            </div>
            <div className='img_file-name'>
              <span>{imageUrlLast}</span>
            </div>
          </>
        )}
        {error && <div className='error'>{error}</div>}
      </Col>
      <Col className='img_container'>
        <div>Back Image</div>
        <Input
          placeholder='- Reverse -'
          value={tempState.image_rev_url}
          onChange={(e) => setTempState({ image_rev_url: e.target.value })}
        />
        {item.image_rev_url && (
          <>
            <img className='img_image' src={item.image_rev_url} />
            <div className='img_delete'>
              <TiDelete className='img_delete-icon' onClick={() => updateImage('del-image_rev_url')} />
            </div>
            <div className='img_file-name'>
              <span>{imageRevUrlLast}</span>
            </div>
          </>
        )}
        {error && <div className='error'>{error}</div>}
      </Col>
    </Row>
  );
};

export default EditImageRow;
