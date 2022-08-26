import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.jsx';

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

  useEffect(() => {
    if (review) {
      const convertedDate = helpers.convertDate(review.date);
      const div = helpers.handlePhotos(review.photos);
      setPhotosDiv(div);
      setDate(convertedDate);
      setHelpfullness(review.helpfulness);
      setUsername(review.reviewer_name);
      setRecommend(review.recommend);
      setResponse(review.response);
      setSummary(review.summary);
      setRating(review.rating);
      setPhotos(review.photos);
      setId(review.review_id);
      setBody(review.body)
    }
  }, []);

  return (
    <div id="review">
      <h4>Review</h4>
      <div>Avgerage Rating: {rating}</div>
      <div>Date Reviewed: {date}</div>
      <div>User: {username}</div>
      <h4>{summary}</h4>
      <div>{body}</div>
      <div>{photosDiv}</div>
      <div>{recommend}</div>
      <div>{response}</div>
      <div>Helpfulness: {helpfulness}</div>
    </div>
  );
}

export default Review;
