import moment from 'moment';
import axios from 'axios';

const helpers = {
  convertDate: (date) => {
    if (date !== '') {
     return moment(date).format('MMMM DD YYYY')
  }},

  handlePhotos: (photos) => {
    const photoDiv = [];

    if ( photos.length !==0 )  {
      photos.forEach((photo) => {
        photoDiv.push(
          <img
            key={photo.id}
            className='review-image'
            src={photo.url}
            alt="image not available"
            onClick={() => console.log(photo)}
          />
        );
      });
    }
    return photoDiv;
  },

  markHelpful: (review_id) => {

    const url = `reviews/${review_id}/helpful`

    const options = {
      method: 'put',
      url,
    };

    axios(options)
      .then(response => {
        console.log(response.status);
      })
      .catch(error => {
        console.log('Error marking helpful')
      })
  }
};

export { helpers };
