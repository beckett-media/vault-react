import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';

const EditImageRow = ({ img, imgRev }) => {
  const [tempImg, setTempImg] = useState(img);
  const [tempImgRev, setTempImgRev] = useState(imgRev);
  return (
    <Row>
      <Col>
        <div>Front Image</div>
        <Input placeholder='- Front -' value={tempImg} onChange={(e) => setTempImg(e.target.value)} />
        {img && (
          <div>
            <TiDelete />
          </div>
        )}
        <Image href={img} />
        <div>
          <span>{imgRev.split('/')[-1]}</span>
        </div>
      </Col>
      <Col>
        <div>Back Image</div>
        <Input placeholder='- Reverse -' value={tempImgRev} onChange={(e) => setTempImgRev(e.target.value)} />
        {imgRev && (
          <div>
            <TiDelete />
          </div>
        )}
        <Image href={imgRev} />
        <div>
          <span>{imgRev.split('/')[-1]}</span>
        </div>
      </Col>
    </Row>
  );
};

export default EditImageRow;
