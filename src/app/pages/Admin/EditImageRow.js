import { Input } from '@chakra-ui/react';
import React from 'react';
import { Image, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';

const EditImageRow = (img, imgRev) => {
  return (
    <Row>
      <Column>
        <div>Front Image</div>
        <Input placeholder='- Front -' value={img} />
        <div>
          <TiDelete />
        </div>
        <Image href={img} />
        <div>
          <span>{imgRev.split('/')[-1]}</span>
        </div>
      </Column>
      <Column>
        <div>Back Image</div>
        <Input placeholder='- Front -' value={imgRev} />
        <div>
          <TiDelete />
        </div>
        <Image href={imgRev} />
        <div>
          <span>{imgRev.split('/')[-1]}</span>
        </div>
      </Column>
    </Row>
  );
};

export default EditImageRow;
