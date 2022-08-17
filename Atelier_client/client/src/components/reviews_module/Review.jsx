import React, { useState } from 'react';

function ReviewTile ( {review} ) {

  const[id, setId] = useState(review.review_id);
  const[rating, setRating] = useState(review.rating);
  const[date, setDate] = useState(review.date);
  const[username, setUsername] = useState(review.reviewer_name);
  const[summary, setSummary] = useState(review.summary);
  const[body, setBody] = useState(review.body);
  const[photos, setPhotos] = useState(review.photos);
  const[recommend, setRecommend] = useState(review.recommend);
  const[response, setResponse] = useState(review.response);
  const[helpfulness, setHelpfull] = useState(review.helpfulness);

  return (
    <div id="review">
      <h4>Review</h4>
      <div>Rating: {rating}</div>
      <div>Date: {date}</div>
      <div>{username}</div>
      <div>{summary}</div>
      <div>{body}</div>
      <div>{recommend}</div>
      <div>{response}</div>
      <div>Helpfulness: {helpfulness}</div>
    </div>
  )
}

export default ReviewTile;