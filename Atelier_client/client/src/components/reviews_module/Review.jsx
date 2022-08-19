import React, { useState } from 'react';
import moment from 'moment';

function Review ( {review} ) {

  const convertedTime = moment(review.date).format('MMMM DD YYYY')

  const[helpfulness, setHelpfull] = useState(review.helpfulness);
  const[username, setUsername] = useState(review.reviewer_name);
  const[recommend, setRecommend] = useState(review.recommend);
  const[response, setResponse] = useState(review.response);
  const[summary, setSummary] = useState(review.summary);
  const[rating, setRating] = useState(review.rating);
  const[photos, setPhotos] = useState(review.photos);
  const[date, setDate] = useState(convertedTime);
  const[id, setId] = useState(review.review_id);
  const[body, setBody] = useState(review.body);

  return (
    <div id="review">
      <h4>**********</h4>
      <div>Avgerage Rating: {rating}</div>
      <div>Date Reviews:    {date}</div>
      <div>User: {username}</div>
      <h4>{summary}</h4>
      <div>{body}</div>
      <div>{recommend}</div>
      <div>{response}</div>
      <div>Helpfulness: {helpfulness}</div>
    </div>
  )
}

export default Review;