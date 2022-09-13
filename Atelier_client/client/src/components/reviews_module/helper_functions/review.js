import moment from 'moment';
import axios from 'axios';

const helpers = {
  createHelpfulnessDiv: (
    helpfulCount,
    setHelpfulCount,
    helpfulness,
    review_id
  ) => {
    let helpfulDiv = [];

    helpfulDiv.push(
      <div id="helpful-text" key={'helpful'}>
        <span className="review-helpfulness">{'Helpful?'}</span>
        <span
          className="helpful-yes"
          onClick={() =>
            helpers.markHelpful(
              helpfulCount,
              setHelpfulCount,
              helpfulness,
              review_id
            )
          }
        >
          {'Yes '}
        </span>
        <span className="review-helpfulness">{`(${helpfulCount})`}</span>
        <span className="review-helpfulness">{'|'}</span>
        <span
          className="review-report"
          onClick={() => helpers.reportReview(review_id)}
        >
          {'Report'}
        </span>
      </div>
    );
    return helpfulDiv;
  },

  createRecommendDiv: (recommend, recommended) => {
    let recDiv = [''];

    if (recommend) {
      recDiv = [];
      recDiv.push(
        <div key={'recommend'} className="review-recommend">
          <i className="fa-light fa-check"></i>
          <span className="review-rec-text">{'I recommend this product'}</span>
        </div>
      );
    }
    return recDiv;
  },

  createResponseDiv: (response, reviewResponse) => {
    let responseDiv = [];

    if (response !== null) {
      responseDiv.push(
        <div key={'response'} id="user-response">
          <div className="response">Response:</div>
          <div className="user-response">{`${response}`}</div>
        </div>
      );
      reviewResponse.current = responseDiv;
      return;
    }
    reviewResponse.current = [<div key="review" />];
  },

  createStarDiv: (rating) => {
    let starRatingDiv = [];

    for (let i = 1; i <= rating; i++) {
      starRatingDiv.push(
        <i className="fak fa-star-solid star" key={`star-solid-${i}`}></i>
      );
    }
    for (let i = rating; i < 5; i++) {
      starRatingDiv.push(
        <i className="fak fa-star-thin star" key={`star-${i}`}></i>
      );
    }
    return starRatingDiv;
  },

  createPhotosDiv: (photos, photoURL, setViewPhoto) => {
    const photoDiv = [];

    photos.forEach((photo) => {
      photoDiv.push(
        <img
          key={photo.id}
          className="review-image"
          src={photo.url}
          alt="image not available"
          onClick={() => helpers.enlargePhotos(photo, photoURL, setViewPhoto)}
        />
      );
    });
    return photoDiv;
  },

  closePhotoModal: (setViewPhoto) => {
    setViewPhoto(() => false);
  },

  enlargePhotos: (photo, photoURL, setViewPhoto) => {
    photoURL.current = photo.url;
    setViewPhoto((prevState) => true);
  },

  markHelpful: (helpfulCount, setHelpfulCount, helpfulness, review_id) => {
    if (helpfulCount === helpfulness) {
      setHelpfulCount((prevState) => prevState + 1);
      helpers.putHelpful(review_id);
    }
  },

  reportReview: (review_id) => {
    const url = `reviews/${review_id}/report`;

    axios
      .put(url)
      .then((response) => response)
      .catch((error) => {
        console.log('Error reporting review:', error);
      });
  },

  formatDate: (date) => {
    if (date !== '') {
      return moment(date).format('MMMM DD YYYY');
    }
  },

  putHelpful: (review_id) => {
    const url = `reviews/${review_id}/helpful`;

    axios
      .put(url)
      .then((response) => response)
      .catch((error) => {
        console.log('Error marking helpful:', error);
      });
  },
};

export { helpers };
