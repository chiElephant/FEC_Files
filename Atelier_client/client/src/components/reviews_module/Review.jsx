import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

function Review ( {helpfulness, review_id, date, username, summary, review, rating} ) {

  const [helpfulnessDiv, setHelpfulnessDiv] = useState(<div />);
  const [formatedDate, setFormatedDate] = useState('');
  const [photosDiv, setPhotosDiv] = useState(<div />);
  const [recommend, setRecommend] = useState(<div />);
  const [response, setResponse] = useState(<div />);
  const [stars, setStars] = useState(<div />);

  const [photos, setPhotos] = useState([]);
  const [body, setBody] = useState('');

  useEffect(() => {
    handleReviewData(review)
  }, [])


  useEffect(() => {
      async function handleDate () {
        const convertedDate = await helpers.convertDate(date);
        setFormatedDate(convertedDate);
      }
      handleDate();

      async function handlePhotos () {
        const photos = await helpers.handlePhotos(review.photos);
        setPhotosDiv(photos);
      }
      handlePhotos();
  }, []);

  useEffect(() => {
    handleRatings(review.rating);
    handleRecommend(review.recommend);
    handleResponse(review.response);
    handleHelpfulness(helpfulness);
  }, []);

  function handleReviewData(review) {
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
    console.log('helpful', helpful)
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
    setHelpfulnessDiv(helpfulDiv);
  }

  function markHelpful() {
    // setHelpfulness(helpfulness + 1)

    // // helpers.markHelpful(review_id);
    // helpers.markHelpful('1275279');
    console.log(review_id);
  }

  return (
    <div id="review">
      <div id='review-top-bar'>
        <div id='stars'>{stars}</div>
        <div id='date'>{formatedDate}</div>
        <div id='username'>{`${username},`}</div>
      </div>
      <div id='summary'>{summary}</div>
      <div id='body'>{body}</div>
      <div id='photos'>{photosDiv}</div>
      <div id='recommend'>{recommend}</div>
      <div id={response !== null ? 'recommend' : ''}>{response}</div>
      <div id='helpfulness'>{helpfulnessDiv}</div>
    </div>
  );
}

export default Review;
