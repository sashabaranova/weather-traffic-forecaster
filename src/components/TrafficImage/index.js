import React from 'react';

const TrafficImage = ({ src, hasError }) => (
  <div className="container">
    <h2 className="heading">Traffic image</h2>
    {hasError ? <p>Sorry, no images were found</p>
      : (
        <div className='trafficImage'>
          <img className='image' src={src} />
        </div>
      )}
  </div>
);

export default TrafficImage;