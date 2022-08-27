// import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import ReviewsModule from '../components/reviews_module/ReviewsModule.jsx';
import ReviewsList from '../components/reviews_module/ReviewsList.jsx';
import Review from '../components/reviews_module/Review.jsx';
import ProductBreakdown from '../components/reviews_module/ProductBreakdown.jsx';
import RatingsBreakdown from '../components/reviews_module/RatingsBreakdown.jsx';
import SubmitReview from '../components/reviews_module/SubmitReview.jsx';

describe('Ratings and Reviews renders correctly', () => {

  describe('RatingsModule', () => {
    test('Reviews Module heading is displayed', () => {
      render(<ReviewsModule />);
      const element = screen.getByRole('button', {
        name: /add review/i,
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe('ReviewsList', () => {
    test('Reviews List heading is displayed', () => {
      render(<ReviewsList />);
      const element = screen.getByRole('heading', {
        hidden: true,
        name: /reviews list/i,
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe('SubmitReview', () => {
    test(`Should display a 'Write Your Review' heading`, () => {
      render(<SubmitReview showReviewModal={true}/>);
      const element = screen.getByRole('heading', {
        hidden: true,
        name: /write your review/i,
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe('Review', () => {
    test(`Should display date reveiewed`, () => {
      render(<Review />);
      const element = screen.getByText(/date reviewed/i);
      expect(element).toBeInTheDocument();
    });
  });

    describe('RatingsBreakdown', () => {
      test('Ratings Breakdonw heading is displayed', () => {
        render(<RatingsBreakdown />);
        const element = screen.getByRole('heading', {
          hidden: true,
          name: /ratings breakdown/i,
        });
        expect(element).toBeInTheDocument();
      });
    });

    describe('ProductBreakdown', () => {
      test('Product Breakdown heading is displayed', () => {
        render(<ProductBreakdown />);
        const element = screen.getByRole('heading', {
          hidden: true,
          name: /product breakdown/i,
        });
        expect(element).toBeInTheDocument();
      });
    });

});
