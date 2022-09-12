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

  const [helpfulCount, setHelpfulCount] = useState(helpfulness);
  const [viewPhoto, setViewPhoto] = useState(false);

  const reviewResponse = useRef([<div key="response" />]);
  const recommended = useRef([<div key="recommend" />]);

  const photoURL = useRef('');

  const formatedDate = useMemo(() => {
    return helpers.formatDate(date);
  }, [date]);

  const photosDisplay = useMemo(() => {
    return helpers.createPhotosDiv(photos, photoURL, setViewPhoto);
  }, [photos]);

  const starRating = useMemo(() => {
    return helpers.createStarDiv(rating);
  }, [rating]);

  const helpful = useMemo(() => {
    return createHelpfulnessDiv();
  }, [helpfulCount]);

  useEffect(() => {
    helpers.createRecommendDiv(recommend, recommended);
    helpers.createResponseDiv(response, reviewResponse);
  }, [review_id]);

  function createHelpfulnessDiv () {
    let helpfulDiv = [];

    helpfulDiv.push(
      <div id="helpful-text" key={'helpful'}>
        <span className="review-helpfulness">{'Helpful?'}</span>
        <span
          className="helpful-yes"
          onClick={() => markHelpful()}
        >
          {'Yes '}
        </span>
        <span className="review-helpfulness">{`(${helpfulCount})`}</span>
        <span className="review-helpfulness">{'|'}</span>
        <span className="review-helpfulness">{'Report'}</span>
      </div>
    );
    return helpfulDiv;
  }

  function markHelpful () {
    console.log(helpfulCount)
    if (helpfulCount === helpfulness) {
      setHelpfulCount((prevState) => prevState + 1);
      createHelpfulnessDiv();
      helpers.putHelpful(review_id, createHelpfulnessDiv);
    }
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
        closePhotoModal={helpers.closePhotoModal}
        setViewPhoto={setViewPhoto}
      />
      {recommended.current}
      {reviewResponse.current}
      <div className="helpfulness">{helpful}</div>
    </div>
  );
}

export default Review;
