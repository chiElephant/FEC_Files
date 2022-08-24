import renderer from 'react-test-renderer';
import ReviewsModule from '../components/reviews_module/ReviewsModule.jsx';
import ReviewsList from '../components/reviews_module/ReviewsList.jsx';
import Review from '../components/reviews_module/Review.jsx';
import ProductBreakdown from '../components/reviews_module/ProductBreakdown.jsx';
import RatingsBreakdown from '../components/reviews_module/RatingsBreakdown.jsx';
import SubmitReview from '../components/reviews_module/SubmitReview.jsx';

//Reviews Module
test('Reviews Module renders correctly', () => {
  const tree = renderer
    .create(<ReviewsModule />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


// //Ratings Breakdown
// test('Ratings Breakdown renders correctly', () => {
//   const tree = renderer
//     .create(<RatingsBreakdown />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// //Add Reviews
// test('Submit Review renders correctly', () => {
//   const tree = renderer
//     .create(<SubmitReview />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });


