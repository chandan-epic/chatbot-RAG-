// src/components/ImageDisplay.js
import React from 'react';

const ImageDisplay = ({ imageSrc }) => {
  return (
    <div className="w-full h-64 flex justify-center items-center">
      <img src={imageSrc} alt="Bot" className="object-cover w-full h-full" />
    </div>
  );
};

export default ImageDisplay;
