import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { blobToBase64 } from '../../utils/image';

// https://react-dropzone-uploader.js.org/docs/customization
const SubmissionImageUploader = ({ onFileChange }) => {
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
    <div className={`drop-${dropStatus}`}>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        accept='image/*'
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drag image or Click to Browse"
        submitButtonDisabled
      />
    </div>
  );
};

export default SubmissionImageUploader;
