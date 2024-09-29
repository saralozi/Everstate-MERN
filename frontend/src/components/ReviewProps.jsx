import React from 'react';

const ReviewProps = ({ testiMonialDetail }) => {
    const { name, address, description, image } = testiMonialDetail;
    console.log("ReviewDetail", testiMonialDetail);
    return (
        <div className="item">
            <div className="shadow-effect">
                <img className="img-circle" src={image} alt="User" />
                <p className='reviewText'>{description}</p>
            </div>
            <div className="review-name">
                <h5 className='reviewName'>{name}</h5>
                <small className='reviewAddress'>{address}</small>
            </div>
        </div>
    );
};

export default ReviewProps;
