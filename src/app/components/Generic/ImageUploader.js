import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { blobToBase64 } from '../../utils/image';
import { ReactComponent as ImageUpload } from '../../assets/image-upload-icon.svg';
import './ImageUpload.scss';
import { Row } from 'react-bootstrap';

// https://react-dropzone-uploader.js.org/docs/customization
const ImageUploader = ({ onFileChange, heading, subHeading }) => {
  const [dropStatus, setDropStatus] = React.useState('');

  // called every time a file's `status` changes
  const handleChangeStatus = async ({ meta, file }, status) => {
    console.log('drop', status, meta, file);
    setDropStatus(status);

    if (status === 'done') {
      onFileChange({
        imageFormat: file.type,
        previewUrl: meta.previewUrl,
        imageBase64: await blobToBase64(meta.previewUrl),
      });
    } else if (status === 'removed') {
      onFileChange(null);
    }
  };

  return (
    <Row className='image-upload_component'>
      <div className='image-upload_overlay'>
        <div className='image-upload_content'>
          <ImageUpload />
          <div className='image-upload_text'>
            <span className='image-upload_text-highlight'>{heading}</span>
          </div>
          <div className='image-upload_text-small'>{subHeading}</div>
        </div>
      </div>

      <div className={`drop-${dropStatus}`}>
        <Dropzone
          onChangeStatus={handleChangeStatus}
          accept='image/*'
          maxFiles={1}
          multiple={false}
          canCancel={false}
          inputContent='Drag image or Click to Browse'
          submitButtonDisabled
        />
      </div>
    </Row>
  );
};

export default ImageUploader;
