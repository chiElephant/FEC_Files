import renderer from 'react-test-renderer';
import ReviewsModule from '../components/reviews_module/ReviewsModule.jsx';
import ReviewsList from '../components/reviews_module/ReviewsList.jsx';
import Review from '../components/reviews_module/Review.jsx';
import ProductBreakdown from '../components/reviews_module/ProductBreakdown.jsx';
import RatingsBreakdown from '../components/reviews_module/RatingsBreakdown.jsx';
import AddReview from '../components/reviews_module/AddReview.jsx';

//Reviews Module

it('renders correctly', () => {
  const tree = renderer
    .create(<ReviewsModule />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


//Ratings Breakdown
it('renders correctly', () => {
  const tree = renderer
  .create(<RatingsBreakdown />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Add Reviews
it('renders correctly', () => {
  const tree = renderer
  .create(<AddReview />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Reviews List
// it('renders correctly', () => {
//   const tree = renderer
//     .create(<ReviewsList />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// //Reviews
// it('renders correctly', () => {
//   const tree = renderer
//     .create(<Review />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// //Product Breakdown
// it('renders correctly', () => {
//   const tree = renderer
//     .create(<ProductBreakdown />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
