import React, { useState, useEffect } from 'react';
import { helpers } from './helper_functions/review.jsx';

function Review({ review }) {
  const [helpfulness, setHelpfull] = useState(review.helpfulness);
  const [username, setUsername] = useState(review.reviewer_name);
  const [recommend, setRecommend] = useState(review.recommend);
  const [response, setResponse] = useState(review.response);
  const [photosDiv, setPhotosDiv] = useState(<div />);
  const [summary, setSummary] = useState(review.summary);
  const [rating, setRating] = useState(review.rating);
  const [photos, setPhotos] = useState(review.photos);
  const [id, setId] = useState(review.review_id);
  const [body, setBody] = useState(review.body);
  const [date, setDate] = useState('');

  useEffect(() => {
    const div = helpers.handlePhotos(review.photos);
    setPhotosDiv(div);
  }, []);

  useEffect(() => {
    const convertedDate = helpers.convertDate(review.date);
    setDate(convertedDate);
  }, []);

  return (
    <div id="review">
      <h4>**********</h4>
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
