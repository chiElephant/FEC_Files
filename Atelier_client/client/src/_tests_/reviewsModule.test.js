import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';

import ProductBreakdown from '../components/reviews_module/ProductBreakdown.jsx';
import RatingsBreakdown from '../components/reviews_module/RatingsBreakdown.jsx';
import Characteristics from '../components/reviews_module/Characteristics.jsx';
import ReviewsModule from '../components/reviews_module/ReviewsModule.jsx';
import SubmitReview from '../components/reviews_module/SubmitReview.jsx';
import ReviewsList from '../components/reviews_module/ReviewsList.jsx';
import ErrorModal from '../components/reviews_module/ErrorModal.jsx';
import PhotoModal from '../components/reviews_module/PhotoModal.jsx';
import StarRating from '../components/reviews_module/StarRating.jsx';
import Photos from '../components/reviews_module/Photos.jsx';
import Review from '../components/reviews_module/Review.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Reviews Module', () => {
  it('renders Reviews Module', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <ReviewsModule />
    )});
  });
});

describe('Reviews List', () => {
  it('renders Reviews List', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <ReviewsList />
    )});
  });
});

describe('Ratings Breakdown', () => {
  it('renders Ratings Breakdown', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <RatingsBreakdown />
    )});
  });
});

describe('Product Breakdown', () => {
  it('renders Product Breakdown', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <ProductBreakdown />
    )});
  });
});

describe('Review', () => {
  it('renders Reviews', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <Review />
    )});
  });
});

describe('Submit Review Modal', () => {
  it('renders submit Review Modal', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <SubmitReview />
    )});
  });
});

describe('Photo Modal ', () => {
  it('renders Photo Modal', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <PhotoModal />
    )});
  });
});

describe('Error Modal', () => {
  it('renders Error Modal', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <ErrorModal />
    )});
  });
});

describe('Characteristics', () => {
  it('renders Characteristics', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <Characteristics />
    )});
  });
});

describe('Photos', () => {
  it('renders Photos', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <Photos />
    )});
  });
});

describe('Star Rating', () => {
  it('renders Reviews Module', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
      <StarRating />
    )});
  });
});

