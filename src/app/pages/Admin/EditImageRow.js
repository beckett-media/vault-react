import { Input } from '@chakra-ui/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';

const EditImageColumn = ({ tempState, item, title, setTempState, field, updateImage }) => {
  const imageUrlLast = item?.[field].split('/').at(-1);
  const tempImageChanged = item[field] !== tempState[field] && tempState[field].length > 0;

  return (
    <Col className='img_container'>
      <div>{title} Image</div>
      <Input
        placeholder={`- ${title} -`}
        value={tempState[field]}
        onChange={(e) => setTempState({ ...tempState, [field]: e.target.value })}
      />
      {item[field] === tempState[field] && (
        <>
          <img className='img_image' src={item[field]} />
          <div
            className='img_delete'
            onClick={() => {
              updateImage(`del-${field.slice(0, -4)}_path`);
              setTempState({ ...tempState, [field]: '../../assets/beckett-card-placeholder--gray.svg' });
            }}
          >
            <TiDelete className='img_delete-icon' />
          </div>
          <div className='img_file-name'>
            <span>{imageUrlLast}</span>
          </div>
        </>
      )}
      {tempImageChanged && (
        <>
          <img className='img_image' src={tempState[field]} />
          <div
            className='img_delete'
            onClick={() => {
              updateImage(`del-${field.slice(0, -4)}_path`);
              setTempState({ ...tempState, [field]: '../../assets/beckett-card-placeholder--gray.svg' });
            }}
          >
            <TiDelete className='img_delete-icon' />
          </div>
          <div className='img_file-name'>
            <span>{imageUrlLast}</span>
          </div>
        </>
      )}
    </Col>
  );
};

const EditImageRow = ({ tempState, item, error, setTempState, updateImage }) => {
  return (
    <>
      <Row>
        <EditImageColumn
          tempState={tempState}
          item={item}
          title={'Front'}
          field={'image_url'}
          setTempState={setTempState}
          updateImage={updateImage}
        />
        <EditImageColumn
          tempState={tempState}
          item={item}
          title={'Reverse'}
          field={'image_rev_url'}
          setTempState={setTempState}
          updateImage={updateImage}
        />
      </Row>
      <Row>{error && <div className='error'>{error}</div>}</Row>
    </>
  );
};

export default EditImageRow;
