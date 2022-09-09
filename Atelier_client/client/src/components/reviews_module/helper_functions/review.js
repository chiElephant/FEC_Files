import moment from 'moment';
import axios from 'axios';

const helpers = {
  convertDate: (date) => {
    if (date !== '') {
     return moment(date).format('MMMM DD YYYY')
  }},

  markHelpful: (review_id) => {
    const url = `reviews/${review_id}/helpful`

    axios.put(url)
      .then(response => {
        console.log(response.status);
      })
      .catch(error => {
        console.log('Error marking helpful')
      })
  }
};

export { helpers };
