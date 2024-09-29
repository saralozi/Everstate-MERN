import React from 'react';

const TypeProps = ({ data }) => {
  const { images, texts } = data;

  return (
    <div className='homeTypesCards'>
      {images.map((image, i) => (
        <div className="imageContainer" key={i}>
          <img src={image} alt={`image${i + 1}`} />
          <div className="TypesTextContainer">
            <p className="TypesText">{texts[i]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TypeProps;