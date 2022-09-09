import React, { useState, useEffect } from 'react';
import PhotoModal from './PhotoModal.jsx';
import { helpers } from './helper_functions/review.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  light,
  thin,
} from '@fortawesome/fontawesome-svg-core/import.macro';

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

  const [currentHelpful, setCurrentHelpful] = useState(helpfulness);
  const [currentPhotoURL, setCurrentPhotoURL] = useState('');
  const [formatedDate, setFormatedDate] = useState('');
  const [viewPhoto, setViewPhoto] = useState(false);

  const [reviewDivs, setReviewDivs] = useState({
    helpfulnessDiv: [<div key={'help'} />],
    recommendDiv: [<div key={'rec'} />],
    responseDiv: [<div key={'resp'} />],
    photosDiv: [<div key={'photos'} />],
    starsDiv: [<div key={'stars'} />],
  });

  useEffect(() => {
    async function handleDate() {
      const convertedDate = await helpers.convertDate(date);
      setFormatedDate((formatedDate) => convertedDate);
    }
    handleDate();

    async function handlePhotos() {
      const div = await createPhotosDiv(photos);

      const newPhotosDiv = { photosDiv: div };
      setReviewDivs((reviewDiv) => ({
        ...reviewDiv,
        ...newPhotosDiv,
      }));
    }
    handlePhotos();
  }, []);

  useEffect(() => {
    createStarDiv();
    createRecommendDiv();
    createResponseDiv();
    createHelpfulnessDiv();
  }, []);

  useEffect(() => {
    createHelpfulnessDiv();
  }, [currentHelpful]);

  async function enlargePhotos(photo) {
    await setCurrentPhotoURL(photo.url);
    setViewPhoto((viewPhoto) => true);
  }

  function createPhotosDiv() {
    const photoDiv = [];
    if (photos) {
      photos.forEach((photo) => {
        photoDiv.push(
          <img
            key={photo.id}
            className="review-image"
            src={photo.url}
            alt="image not available"
            onClick={() => enlargePhotos(photo)}
          />
        );
      });
    }
    return photoDiv;
  }

  function createStarDiv() {
    let starRating = [];
    if (rating !== 0) {
      for (let i = 1; i <= rating; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={`star-solid-${i}`}
            className="star"
            icon={solid('star-sharp')}
          />
        );
      }
      for (let i = rating; i < 5; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={`star-${i}`}
            className="star"
            icon={light('star-sharp')}
          />
        );
      }
    }
    const newStarsDiv = { starsDiv: starRating };
    setReviewDivs((reviewDivs) => ({
      ...reviewDivs,
      ...newStarsDiv,
    }));
  }

  function createRecommendDiv() {
    let recDiv = [];

    if (recommend) {
      recDiv.push(
        <div key={'recommend'} id="user-recommend">
          <FontAwesomeIcon icon={regular('check')} />
          <span id="user-rec">{'I recommend this product'}</span>
        </div>
      );
      const newRecDiv = { recommendDiv: recDiv };
      setReviewDivs((reviewDivs) => ({
        ...reviewDivs,
        ...newRecDiv,
      }));
    }
  }

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

  function createHelpfulnessDiv() {
    let helpfulDiv = [];

    helpfulDiv.push(
      <div id="helpful-text" key={'helpful'}>
        <div>{'Helpful?'}</div>
        <div className="helpful-yes" onClick={() => markHelpful()}>
          {'Yes '}
        </div>
        <div>{`(${currentHelpful})`}</div>
        <div>
          <FontAwesomeIcon icon={thin('pipe')} />
        </div>
        <div>{'Report'}</div>
      </div>
    );
    const newHelpfulDiv = { helpfulnessDiv: helpfulDiv };
    setReviewDivs((reviewDivs) => ({
      ...reviewDivs,
      ...newHelpfulDiv,
    }));
  }

  function markHelpful() {
    if (currentHelpful === helpfulness) {
      const newHelpful = currentHelpful + 1;

      setCurrentHelpful((currentHelpful) => newHelpful);
      helpers.markHelpful(review_id);
    }
  }

  function closePhotoModal() {
    setViewPhoto(() => false);
  }

  return (
    <div id="review">
      <div id="review-top-bar">
        <div id="stars">{reviewDivs.starsDiv}</div>
        <div id="date">{formatedDate}</div>
        <div id="username">{`${username},`}</div>
      </div>
      <div id="summary">{summary}</div>
      <div id="body">{body}</div>
      <div id="photos">{reviewDivs.photosDiv}</div>
      <PhotoModal
        photoURL={currentPhotoURL}
        viewPhoto={viewPhoto}
        closeModal={closePhotoModal}
      />
      <div id="recommend">{reviewDivs.recommendDiv}</div>
      <div id={response !== null ? 'recommend' : ''}>
        {reviewDivs.responseDiv}
      </div>
      <div id="helpfulness">{reviewDivs.helpfulnessDiv}</div>
    </div>
  );
}

export default Review;
