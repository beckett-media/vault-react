import { Input } from '@chakra-ui/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';

const EditImageRow = ({ tempState, item, error, setTempState, updateImage }) => {
  const imageUrlLast = item?.image_url?.split('/').at(-1);
  const imageRevUrlLast = item?.image_rev_url?.split('/').at(-1);
  console.log(tempState.image_url, item.image_url);
  return (
    <Row>
      <Col className='img_container'>
        <div>Front Image</div>
        <Input
          placeholder='- Front -'
          value={tempState.image_url}
          onChange={(e) => setTempState({ ...tempState, image_url: e.target.value })}
        />
        {item.image_url === tempState.image_url && (
          <>
            <img className='img_image' src={item.image_url} />
            <div className='img_delete' onClick={() => updateImage('del-image_path')}>
              <TiDelete className='img_delete-icon' />
            </div>
            <div className='img_file-name'>
              <span>{imageUrlLast}</span>
            </div>
          </>
        )}
        {item.image_url !== tempState.image_url && tempState.image_url?.length > 0 && (
          <>
            <img className='img_image' src={tempState.image_url} />
            <div className='img_delete' onClick={() => updateImage('del-image_path')}>
              <TiDelete className='img_delete-icon' />
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
          onChange={(e) => setTempState({ ...tempState, image_rev_url: e.target.value })}
        />
        {item.image_rev_url === tempState.image_rev_url && (
          <>
            <img className='img_image' src={item.image_rev_url} />
            <div className='img_delete' onClick={() => updateImage('del-image_rev_path')}>
              <TiDelete className='img_delete-icon' />
            </div>
            <div className='img_file-name'>
              <span>{imageRevUrlLast}</span>
            </div>
          </>
        )}
        {item.image_rev_url !== tempState.image_rev_url && tempState.image_rev_url?.length > 0 && (
          <>
            <img className='img_image' src={tempState.image_rev_url} />
            <div className='img_delete' onClick={() => updateImage('del-image_rev_path')}>
              <TiDelete className='img_delete-icon' />
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
