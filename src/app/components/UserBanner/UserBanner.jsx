import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';
import Dropzone from 'react-dropzone-uploader';
import { BsCamera } from 'react-icons/bs';

import './UserBanner.scss';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { ReactComponent as BgSphere } from '../../assets/bg-sphere.svg';
import { formatPrice } from '../../utils/strings';
import { blobToBase64 } from '../../utils/image';
import { uploadImageToS3 } from '../../services/user';
import { mapUserToCognito } from '../../services/user';

const UserBanner = ({ vaultedItems = 0, vaultedValue = 0, canEditImage = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();

  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);

  useEffect(() => {
    setUserId(userState.sub);
  }, []);

  const uploadImage = async (image) => {};

  const handleChangeStatus = async ({ meta, file }, status) => {
    setIsLoading(true);

    if (status === 'done') {
      const imageFormat = file.type;
      const imageBase64 = await blobToBase64(meta.previewUrl);

      const image = {
        image_base64: imageBase64?.split(`data:${imageFormat};base64,`)[1] || '',
        image_format: imageFormat.split('/')[1] || 'png',
      };

      try {
        uploadImageToS3(userId, image).then((resp) => {
          authContext.setAttributes(mapUserToCognito({ ...userState, profile: resp.data.image_url }));
        });
      } catch {
        (e) => console.log(e);
      } finally {
      }
    } else if (status === 'removed') {
      onFileChange(null);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const bannerDetails = vaultedItems ? (
    <div className='user-banner_content-layout'>
      <div className='user-banner_heading user-banner_grid-1'>{userState.preferred_username}</div>
      <div className='user-banner_body user-banner_grid-2'>Vaulted Items</div>
      <div className='user-banner_body user-banner_grid-3'>Vaulted Value</div>
      {/* Todo: add dynamic date-joined field */}
      {/* <div className='user-banner_body user-banner_grid-4'>joined Aug, 2022</div> */}
      <div></div>
      <div className='user-banner_stat-content user-banner_grid-5'>{vaultedItems}</div>
      <div className='user-banner_stat-content user-banner_grid-6'>{formatPrice(vaultedValue)}</div>
    </div>
  ) : (
    <div className='user-banner_content-layout'>
      <div className='user-banner_heading user-banner_grid-1'>{userState.preferred_username}</div>
      {/* Todo: add dynamic date-joined field */}
      <div></div>
      <div></div>
      {/* <div className='user-banner_body user-banner_grid-4'>joined Aug, 2022</div> */}
      <div></div>
    </div>
  );

  return (
    <div className='user-banner_component'>
      <BgSphere className='user-banner_bg-sphere z-index-0' />
      <div className='page-padding z-index-1 position-relative'>
        <div className='container-large'>
          <div className='user-banner_layout'>
            <div className='user-banner_image-wrapper'>
              {canEditImage && (
                <div className='user-banner_image-upload'>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <div className='d-flex flex-column align-items-center'>
                        <BsCamera className='user-banner_image-upload-icon' />
                        <div>Update Image</div>
                      </div>
                      <Dropzone
                        classNames={{ dropzone: 'user-banner_image-upload-dropzone' }}
                        onChangeStatus={handleChangeStatus}
                        accept='image/*'
                        maxFiles={1}
                        multiple={false}
                        canCancel={false}
                        inputContent='Drag image or Click to Browse'
                        submitButtonDisabled
                      />
                    </>
                  )}
                </div>
              )}
              <img className='user-banner_image' src={userState.profile || require('../../assets/stockImage.jpeg')} />
            </div>
            {bannerDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
