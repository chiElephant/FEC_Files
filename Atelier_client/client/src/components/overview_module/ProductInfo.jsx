import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getAvgRating from './helper-functions/helper.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-scroll';

function ProductInfo(props) {

  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Make a request to get the reviews information, calculate avg, and set state

  useEffect(() => {
    axios.get('/reviews/meta', { params: {product_id: props.product.id }})
      .then((data) => {
        // console.log('The reviews meta data is: ', data.data.ratings);
        // console.log(`The avg rating is: ${getAvgRating(data.data.ratings)}`)
        setAvgRating(getAvgRating(data.data.ratings).avg);
        setTotalReviews(getAvgRating(data.data.ratings).reviewsCount);
      })
  }, []);


  if (Object.keys(props.product).length && avgRating !== null) {
    return (
      <div>
        <div className="product_info_reviews">
          <fieldset>
            {avgRating >= 1
                ? <FontAwesomeIcon
                    id="star-1"
                    icon={solid('star')}
                    key='1'
                  />
                : <FontAwesomeIcon
                id="star-1"
                icon={regular('star')}
                key='1'
                />
            }
            {avgRating >= 2
              ? <FontAwesomeIcon
                  id="star-2"
                  icon={solid('star')}
                  key='2'
                />
              : <FontAwesomeIcon
              id="star-2"
              icon={regular('star')}
              key='2'
              />
            }
            {avgRating >= 3
              ? <FontAwesomeIcon
                  id="star-3"
                  icon={solid('star')}
                  key='3'
                />
              : <FontAwesomeIcon
              id="star-3"
              icon={regular('star')}
              key='3'
              />
            }
            {avgRating >= 4
              ? <FontAwesomeIcon
                  id="star-4"
                  icon={solid('star')}
                  key='4'
                />
              : <FontAwesomeIcon
              id="star-4"
              icon={regular('star')}
              key='4'
              />
            }
            {avgRating === 5
              ? <FontAwesomeIcon
                  id="star-5"
                  icon={solid('star')}
                  key='5'
                />
              : <FontAwesomeIcon
              id="star-5"
              icon={regular('star')}
              key='5'
              />
            }
          </fieldset>
          <Link to='reviews-module' smooth={true} duration={500}>Read all &#40;{totalReviews}&#41; reviews </Link>
        </div>
        <div>{props.product.category}</div>
        <div>{props.product.name}</div>
        <div>{props.product.default_price}</div>
        <h4>{props.product.slogan}</h4>
        <div>{props.product.description}</div>
        <ul>
          {props.product.features.map((feature, index) => {
            return <li key={index}>{feature.value + ' ' + feature.feature}</li>;
          })}
        </ul>

        <button>Add to My Outfit</button>
      </div>
    );
  } else {
    return (
      <div>
        <div className="product_info_reviews">
          <div data-testid='star-rating'>This product has 4 stars reviews</div>
          <button>Read all reviews</button>
        </div>
        <button>Add to My Outfit</button>
      </div>
    );
  }
}

export default ProductInfo;
