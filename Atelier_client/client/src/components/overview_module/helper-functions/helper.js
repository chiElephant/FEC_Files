

function avgRating(ratings) {
  let reviewsCount = 0;
  let sum = 0;
  let avg = 0;

  for (const rating in ratings) {
    const key = parseInt(rating, 10);
    const value = parseInt(ratings[rating], 10);

    reviewsCount += value;
    sum += key * value;
  }

  avg = (sum / reviewsCount).toFixed(1);

  var result = {
    avg: avg,
    reviewsCount: reviewsCount
  }
  return result;
}

export default avgRating;