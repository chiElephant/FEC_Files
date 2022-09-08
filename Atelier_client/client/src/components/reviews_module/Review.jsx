import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.js';
import uniqid from 'uniqid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

function Review ( props ) {

  const { helpfulness, review_id, date, username, summary, review, rating, body, response, recommend, photos } = props

  const [currentHelpful, setCurrentHelpful] = useState(helpfulness);
  const [formatedDate, setFormatedDate] = useState('');

  const [reviewDivs, setReviewDivs] = useState({
    helpfulnessDiv: [<div />],
    recommendDiv: [<div />],
    responseDiv: [<div />],
    photosDiv: [<div />],
    starsDiv: [<div />],
  });

  // const [helpfulnessDiv, setHelpfulnessDiv] = useState(<div />);
  // const [recommendDiv, setRecommendDiv] = useState(<div />);
  // const [responseDiv, setResponseDiv] = useState(<div />);
  // const [photosDiv, setPhotosDiv] = useState(<div />);
  // const [starsDiv, setStarsDiv] = useState(<div />);

  useEffect(() => {
      async function handleDate () {
        const convertedDate = await helpers.convertDate(date);
        setFormatedDate(convertedDate);
      }
      handleDate();

      async function handlePhotos () {
        const div = await helpers.handlePhotos(photos);

        const newPhotosDiv = { photosDiv: div};
        setReviewDivs(reviewDiv => ({
          ...reviewDiv,
          ...newPhotosDiv
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

  function createStarDiv() {
    let starRating = []
    if (rating !== 0) {
      for (let i = 1; i <= rating; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={uniqid()}
            className='star'
            icon={solid('star-sharp')}
          />
        )
      }
      for (let i = rating; i < 5; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={uniqid()}
            className='star'
            icon={light('star-sharp')}
          />
        )
      }
    }
    const newStarsDiv = { starsDiv: starRating};
    setReviewDivs(reviewDivs => ({
      ...reviewDivs,
      ...newStarsDiv
    }));
  }

  function createRecommendDiv () {
    let recDiv = [];

    if (recommend) {
      recDiv.push(
        <div key={uniqid()} id='user-recommend'>
          <FontAwesomeIcon
            key={uniqid()}
            icon={regular('check')}
          />
          <span id='user-rec'>
            {'I recommend this product'}
          </span>
        </div>
      );
      const newRecDiv = { recommendDiv: recDiv};
      setReviewDivs(recommendDiv => ({
        ...recommendDiv,
        ...newRecDiv
      }));
    }
  }

  function createResponseDiv () {
    let responseDiv = [];

    if (response) {
      responseDiv.push(
        <div key={uniqid()} id='user-response'>
         <div className='response'>
          {'Response:'}
         </div>
         <div className='user-response'>
          {`${response}`}
         </div>
        </div>
      )
      const newResponseDiv = { responseDiv: responseDiv};
      setReviewDivs(recommendDiv => ({
        ...responseDiv,
        ...newResponseDiv,
      }));
    }
  }

  function createHelpfulnessDiv () {
    let helpfulDiv = [];

    helpfulDiv.push(
      <div id='helpful-text' key={uniqid()}>
        <div>
          {'Helpful?'}
        </div>
        <div
        className='helpful-yes'
        onClick={() => markHelpful()}
        >
          {'Yes '}
        </div>
        <div>
          {`(${currentHelpful})`}
        </div>
        <div>
          <FontAwesomeIcon
            icon={thin('pipe')}
          />
        </div>
        <div>
          {'Report'}
        </div>
      </div>
    )
    const newHelpfulDiv = { helpfulnessDiv: helpfulDiv};
    setReviewDivs(reviewDivs => ({
      ...reviewDivs,
      ...newHelpfulDiv
    }));
  }

  function markHelpful() {
    if (currentHelpful === helpful) {
      const newHelpful = currentHelpful + 1
      console.log(newHelpful)
      setCurrentHelpful(currentHelpful => currentHelpful + 1)
      createHelpfulnessDiv(newHelpful)
      helpers.markHelpful(review_id);
    }
  }

  return (
    <div id="review">
      <div id='review-top-bar'>
        <div id='stars'>{reviewDivs.starsDiv}</div>
        <div id='date'>{formatedDate}</div>
        <div id='username'>{`${username},`}</div>
      </div>
      <div id='summary'>{summary}</div>
      <div id='body'>{body}</div>
      <div id='photos'>{reviewDivs.photosDiv}</div>
      <div id='recommend'>{reviewDivs.recommendDiv}</div>
      <div id={response !== null ? 'recommend' : ''}>{reviewDivs.responseDiv}</div>
      <div id='helpfulness'>{reviewDivs.helpfulnessDiv}</div>
    </div>
  );
}

export default Review;
