import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

function Review({ review }) {

  const [photosDiv, setPhotosDiv] = useState(<div />);
  const [helpfulness, setHelpfulness] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [response, setResponse] = useState(null);
  const [review_id, setReview_id] = useState(0);
  const [username, setUsername] = useState('');
  const [stars, setStars] = useState(<div />);
  const [summary, setSummary] = useState('');
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    handleReviewData(review)
  }, [review])

  useEffect(() => {
    if (review) {
      async function handleDate () {
        const convertedDate = await helpers.convertDate(review.date);
        setDate(convertedDate);
      }
      handleDate()

    }
  }, [review]);

  useEffect(() => {
    async function handlePhotos () {
      const photos = await helpers.handlePhotos(review.photos);
      setPhotosDiv(photos);
    }
    handlePhotos();
  }, [review]);

  useEffect(() => {
    handleRatings(review.rating);
    handleRecommend(review.recommend);
    handleResponse(review.response);
  }, [review]);

  useEffect(() => {
    handleHelpfulness(review.helpfulness);
  }, [review]);

  function handleReviewData(review) {
    setReview_id(review.review_id);
    setUsername(review.reviewer_name.concat(','));
    setSummary(review.summary);
    setRating(review.rating);
    setPhotos(review.photos);
    setBody(review.body);
  }

  function handleRatings(rating) {
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
    setStars(starRating);
  }

  function handleRecommend (recommend) {
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
      setRecommend(recDiv);
    }
  }

  function handleResponse (response) {
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
      setResponse(responseDiv)
    }
  }

  function handleHelpfulness (helpful) {
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
          {`(${helpful})`}
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
    setHelpfulness(helpfulDiv);
  }

  function markHelpful() {

    const addHelpful = helpfulness + 1;
    handleHelpfulness(addHelpful);

    helpers.markHelpful(review_id);
  }

  return (
    <div id="review">
      <div id='review-top-bar'>
        <div id='stars'>{stars}</div>
        <div id='date'>{date}</div>
        <div id='username'>{username}</div>
      </div>
      <div id='summary'>{summary}</div>
      <div id='body'>{body}</div>
      <div id='photos'>{photosDiv}</div>
      <div id='recommend'>{recommend}</div>
      <div id={response !== null ? 'recommend' : ''}>{response}</div>
      <div id='helpfulness'>{helpfulness}</div>
    </div>
  );
}

export default Review;
