import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

function Review ( {helpfulness, review_id, date, username, summary, review, rating, body, response, recommend, photos } ) {

  const [currentHelpful, setCurrentHelpful] = useState(helpfulness);

  const [reviewDivs, setReviewDivs] = useState({
    helpfulnessDiv: '<div />'
  })

  const [helpfulnessDiv, setHelpfulnessDiv] = useState(<div />);
  const [recommendDiv, setRecommendDiv] = useState(<div />);
  const [responseDiv, setResponseDiv] = useState(<div />);
  const [formatedDate, setFormatedDate] = useState('');
  const [photosDiv, setPhotosDiv] = useState(<div />);
  const [starsDiv, setStarsDiv] = useState(<div />);

  useEffect(() => {
      async function handleDate () {
        const convertedDate = await helpers.convertDate(date);
        setFormatedDate(convertedDate);
      }
      handleDate();

      async function handlePhotos () {
        const div = await helpers.handlePhotos(photos);
        setPhotosDiv(div);
      }
      handlePhotos();
  }, []);

  useEffect(() => {
    createStarDiv(rating);
    createRecommendDiv(recommend);
    createResponseDiv(response);
    createHelpfulnessDiv(helpfulness);
  }, []);

  function createStarDiv(rating) {
    let starRating = []
    if (rating !== 0) {
      for (let i = 1; i <= rating; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={`${i}-solid`}
            className='star'
            icon={solid('star-sharp')}
          />
        )
      }
      for (let i = rating; i < 5; i++) {
        starRating.push(
          <FontAwesomeIcon
            key={`${i}-regular`}
            className='star'
            icon={light('star-sharp')}
          />
        )
      }
    }
    setStarsDiv(starRating);
  }

  function createRecommendDiv (recommend) {
    let recDiv = [];

    if (recommend) {
      recDiv.push(
        <div key='recommend' id='user-recommend'>
          <FontAwesomeIcon
            key='1'
            icon={regular('check')}
          />
          <span id='user-rec'>
            {'I recommend this product'}
          </span>
        </div>
      );
      setRecommendDiv(recDiv);
    }
  }

  function createResponseDiv (response) {
    let responseDiv = [];

    if (response) {
      responseDiv.push(
        <div key='response' id='user-response'>
         <div className='response'>
          {'Response:'}
         </div>
         <div className='user-response'>
          {`${response}`}
         </div>
        </div>
      )
      setResponseDiv(responseDiv)
    }
  }

  function createHelpfulnessDiv (helpful) {
    let helpfulDiv = [];

    helpfulDiv.push(
      <div id='helpful-text' key='helpful'>
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
    setHelpfulnessDiv(prevHelpfulDiv => helpfulDiv);
  }

  function markHelpful() {
    setCurrentHelpful(prevCurrentHelpful => prevCurrentHelpful + 1)
    createHelpfulnessDiv(helpfulness += 1)
    helpers.markHelpful(review_id);
  }

  return (
    <div id="review">
      <div id='review-top-bar'>
        <div id='stars'>{starsDiv}</div>
        <div id='date'>{formatedDate}</div>
        <div id='username'>{`${username},`}</div>
      </div>
      <div id='summary'>{summary}</div>
      <div id='body'>{body}</div>
      <div id='photos'>{photosDiv}</div>
      <div id='recommend'>{recommendDiv}</div>
      <div id={response !== null ? 'recommend' : ''}>{responseDiv}</div>
      <div id='helpfulness'>{helpfulnessDiv}</div>
    </div>
  );
}

export default Review;
