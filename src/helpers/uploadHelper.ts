import { Crop } from 'react-image-crop';

/* eslint-disable no-plusplus */
export const base64StringtoFile = (base64String: any, filename: string) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Download a Base64-encoded file

export const downloadBase64File = (base64Data: string, filename: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', base64Data);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export function extractImageFileExtensionFromBase64(base64Data: string) {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  );
}

export const image64toCanvasRef = (
  imageRef: HTMLCanvasElement,
  image64: string,
  pixelCrop: Crop
) => {
  const canvas = imageRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  const newImage = new Image();
  newImage.src = image64;
  newImage.onload = function () {
    ctx!.drawImage(
      newImage,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
};
