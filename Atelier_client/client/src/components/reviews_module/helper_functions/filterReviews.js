export default function filter(currentFilters, countDisplayed, reviews) {
  let filteredReviews = [];

  const filtersActive = Object.values(currentFilters).indexOf(true);

  if (filtersActive > 0) {
    for (let review of reviews.current) {
      if (currentFilters[review.rating]) {
        filteredReviews.push(review);
      }
    }
    return filteredReviews;
  }

  const reviewsPerCount = reviews.current.slice(0, countDisplayed.current);

  return reviewsPerCount;
}
