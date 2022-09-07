import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function Review({ review }) {
  const [helpfulness, setHelpfullness] = useState(0);
  const [username, setUsername] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [response, setResponse] = useState(null);
  const [photosDiv, setPhotosDiv] = useState(<div />);
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [id, setId] = useState(0);
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [stars, setStars] = useState(<div />);

  useEffect(() => {
    if (review) {
      const convertedDate = helpers.convertDate(review.date);
      const div = helpers.handlePhotos(review.photos);

      handleHelpfulness(review.helpfulness);
      handleRecommend(review.recommend);
      handleResponse(review.response);
      createRatingsDiv(review.rating);

      setUsername(review.reviewer_name.concat(','));
      setSummary(review.summary);
      setRating(review.rating);
      setPhotos(review.photos);
      setId(review.review_id);
      setDate(convertedDate);
      setBody(review.body)
      setPhotosDiv(div);
    }
  }, [review]);

  function createRatingsDiv(rating) {
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
            icon={thin('star-sharp')}
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
        <div>
          {'Yes '}{`(${helpful})`}
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
    setHelpfullness(helpfulDiv);
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
