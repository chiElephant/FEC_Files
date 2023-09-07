import React, { cloneElement } from 'react';
import {
  Star,
  StarHalfOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';

const fullStarIcon = <Star />;
const halfStarIcon = <StarHalfOutlined />;
const emptyStarIcon = <StarBorderOutlined />;

export default function renderRatings(ratingAverage) {
  if (ratingAverage === null) {
    return Array(5)
      .fill(null)
      .map((_, i) => cloneElement(emptyStarIcon, { key: `empty-${i}` }));
  }

  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage % 1 !== 0;
  const emptyStars = Math.floor(5 - ratingAverage);

  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(cloneElement(fullStarIcon, { key: `full-${i}` }));
  }

  if (hasHalfStar) {
    starElements.push(cloneElement(halfStarIcon, { key: 'half' }));
  }

  for (let i = 0; i < emptyStars; i++) {
    starElements.push(cloneElement(emptyStarIcon, { key: `empty-${i}` }));
  }

  return starElements;
}
