import React, { useState, useEffect, useMemo, useRef } from 'react';
import PhotoModal from './PhotoModal.jsx';
import { helpers } from './helper_functions/review.js';

function Review(props) {
  const {
    helpfulness,
    review_id,
    date,
    username,
    summary,
    review,
    rating,
    body,
    response,
    recommend,
    photos,
  } = props;

  // const [currentHelpful, setCurrentHelpful] = useState(helpfulness);
  // const [currentPhotoURL, setCurrentPhotoURL] = useState('');
  const [viewPhoto, setViewPhoto] = useState(false);

  const [reviewDivs, setReviewDivs] = useState({
    helpfulnessDiv: [<div key={'help'} />],
    recommendDiv: [<div key={'rec'} />],
    responseDiv: [<div key={'resp'} />],
  });

  const recommended = useRef([<div key="recommend" />]);

  const helpful = useRef([<div key="helpful" />]);
  const helpfulCount = useRef(props.helpfulness);

  const photoURL = useRef('');

  const starRating = useMemo(() => {
    return createStarDiv(rating);
  }, [rating]);

  const formatedDate = useMemo(() => {
    return helpers.formatDate(date);
  }, [date]);

  const photosDisplay = useMemo(() => {
    return createPhotosDiv(photos, photoURL, setViewPhoto);
  }, [photos]);


  useEffect(() => {
    createHelpfulnessDiv(props.helpfulness, helpfulCount, helpful);
    createRecommendDiv(recommend, recommended);
    createResponseDiv(response);
  }, [recommend, response, helpfulness]);

  // useEffect(() => {
  //   createHelpfulnessDiv();
  // }, [currentHelpful]);

  function createResponseDiv() {
    let responseDiv = [];

    if (response) {
      responseDiv.push(
        <div key={'response'} id="user-response">
          <div className="response">{'Response:'}</div>
          <div className="user-response">{`${response}`}</div>
        </div>
      );
      const newResponseDiv = { responseDiv: responseDiv };
      setReviewDivs((reviewDivs) => ({
        ...reviewDiv,
        ...newResponseDiv,
      }));
    }
  }

  function closePhotoModal() {
    setViewPhoto(() => false);
  }

  return (
    <div className="review">
      <div className="review-tile-top-bar">
        <div className="stars">{starRating}</div>
        <div className="date">{formatedDate}</div>
        <div className="username">{`${username},`}</div>
      </div>
      <div className="summary">{summary}</div>
      <div className="body">{body}</div>
      <div className="photos">{photosDisplay}</div>
      <PhotoModal
        photoURL={photoURL.current}
        viewPhoto={viewPhoto}
        closeModal={closePhotoModal}
      />
      {recommended.current}
      <div className={response !== null ? 'recommend' : ''}>
        {reviewDivs.responseDiv}
      </div>
      <div className="helpfulness">{helpful.current}</div>
    </div>
  );
}

export default Review;

function enlargePhotos(photo, photoURL, setViewPhoto) {
  photoURL.current = photo.url;
  setViewPhoto((prevState) => true);
}

function markHelpful(helpfulness, helpfulCount) {
  if (helpfulCount.current === helpfulness) {
    helpfulCount.current = helpfulCount.current + 1;
  }
  helpers.markHelfpul(product_id);
}

function createStarDiv(rating) {
  let starRatingDiv = [];

  for (let i = 1; i <= rating; i++) {
    starRatingDiv.push(
      <i className="fak fa-star-solid star" key={`star-solid-${i}`}></i>
    );
  }
  for (let i = rating; i < 5; i++) {
    starRatingDiv.push(
      <i className="fak fa-star-thin star" key={`star-${i}`}></i>
    );
  }
  return starRatingDiv;
}

function createPhotosDiv(photos, photoURL, setViewPhoto) {
  const photoDiv = [];

  photos.forEach((photo) => {
    photoDiv.push(
      <img
        key={photo.id}
        className="review-image"
        src={photo.url}
        alt="image not available"
        onClick={() => enlargePhotos(photo, photoURL, setViewPhoto)}
      />
    );
  });
  return photoDiv;
}

function createRecommendDiv(recommend, recommended) {
  let recDiv = [];

  recDiv.push(
    <div key={'recommend'} className="review-recommend">
      <i className="fa-light fa-check"></i>
      <span className="review-rec-text">{'I recommend this product'}</span>
    </div>
  );
  recommended.current = recDiv;
}

function createHelpfulnessDiv(helpfulness, helpfulCount, helpful) {
  let helpfulDiv = [];

  helpfulDiv.push(
    <div id="helpful-text" key={'helpful'}>
      <span className="review-helpfulness">{'Helpful?'}</span>
      <span
        className="helpful-yes"
        onClick={() => markHelpful(helpfulness, helpfulCount)}
      >
        {'Yes '}
      </span>
      <span className="review-helpfulness">{`(${helpfulCount.current})`}</span>
      <span className="review-helpfulness">{'|'}</span>
      <span className="review-helpfulness">{'Report'}</span>
    </div>
  );
  helpful.current = helpfulDiv;
}
