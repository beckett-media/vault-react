import requireContext from 'require-context.macro';

export function blobToBase64(blobUrl) {
  return new Promise(async (resolve, reject) => {
    // do a request to the blob uri
    const response = await fetch(blobUrl);

    if (!response.ok) {
      reject(new Error('Blob url is not valid'));
      return;
    }

    // response has a method called .blob() to get the blob file
    const blob = await response.blob();

    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const images = requireContext('../assets/Images', true);

export const getImageAssetUrl = (url) => {
  if (!url) {
    return '';
  }

  try {
    return url.startsWith('http://') || url.startsWith('https://') ? url : images(`./${url}`);
  } catch (e) {
    console.error('getImageAssetUrl error', e);
    return url;
  }
};
