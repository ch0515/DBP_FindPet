import React from 'react';

const ImageViewer = ({ imageUrls }) => {
  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} width="100" height="100" />
      ))}
    </div>
  );
};

export default ImageViewer;
