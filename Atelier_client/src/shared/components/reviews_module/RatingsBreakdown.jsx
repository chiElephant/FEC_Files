import React, { useEffect, useMemo, useRef } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import helpers from './helper_functions/ratings_bd.js';

function RatingsBreakdown({
  product_id,
  setCharacteristics,
  characteristics,
  setCurrentFilters,
  currentFilters,
  metaData,
}) {
  const percentRecommended = useRef(metaData.percentRecommended);
  const totalReviews = useRef(metaData.totalReviews);
  const avgRating = useRef(metaData.avgRating);
  const metadata = useRef(metaData);
  const isInitialRender = useRef(true);

  const starsRatings = useMemo(
    () => helpers.createStarsRating(avgRating),
    [avgRating.current]
  );

  const ratingsBreakDown = useMemo(
    () => helpers.createRatingsBD(metadata, setCurrentFilters),
    [metadata.current]
  );

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      helpers.getMetadata(product_id, (meta) => {
        metadata.current = meta;
        helpers.handleRatings(meta.ratings, (avg, reviewsCount) => {
          totalReviews.current = reviewsCount;
          avgRating.current = avg;
        });
        helpers.handleRecommended(meta.recommended, (avg) => {
          percentRecommended.current = avg;
        });

        setCharacteristics(() => meta.characteristics);
      });
    }
  }, [product_id]);

  return (
    <div id="ratings-breakdown" fromelement="Ratings/Reviews">
      <div id="average-rating">
        <div
          id="average"
          fromelement="Ratings/Reviews"
        >{`${avgRating.current}`}</div>
        <div id="breakdown-stars" fromelement="Ratings/Reviews">
          {/* {starsRatings} */}
        </div>
      </div>
      <div
        id="review-count"
        fromelement="Ratings/Reviews"
      >{`out of ${totalReviews.current} ratings`}</div>
      <div id="recommend-percent" fromelement="Ratings/Reviews">
        {`${percentRecommended.current}% of reviewers recommend this product`}
      </div>
      <div id="ratings-graph" fromelement="Ratings/Reviews">
        {ratingsBreakDown}
      </div>
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
}
export default RatingsBreakdown;
