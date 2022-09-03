import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  submitReviewForm,
  productName,
  product_id,
  chars,
}) {
  const [productChars, setProductChars] = useState({});
  const [addPhotoDiv, setAddPhotoDiv] = useState(<div />);
  const [charsDiv, setCharsDiv] = useState(<div />);
  const [recommend, setRecommend] = useState(false);
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    createCharsDiv();
  }, [chars]);

  const handleChange = (cb, value) => {
    cb(`${value}`);
  };

  const handleSubmit = () => {
    setShowReviewModal(false);
    axios
      .post('/reviews', {
        product_id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics: productChars,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('post error: ', error);
      });
  };

  const charsKey = {
    Size: {
      1: 'A size too small',
      2: '1/2 size too small',
      3: 'Perfect',
      4: '1/2 size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality: {
      1: 'Poor',
      2: 'Below Average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };

  const handleClick = (cb, value) => {
    cb(value);
  };

  const handlePhotos = () => {
    let files = document.querySelector('#photo-input').files;
    let fileURLs = photos;

    if (files.length <= 5) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // if (!file.type.startsWith('image/')) {
        //   continue;
        // }

        const img = document.createElement('img');
        img.file = file;
        img.width = 80;

        images.appendChild(img);

        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
          fileURLs.push(e.target.result);
          console.log(fileURLs)
          setPhotos(fileURLs);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCharacteristics = (char, id, value) => {
    let chars = productChars;
    chars[`${id}`] = value;
    console.log(productChars)
    console.log(chars)
    setProductChars(chars);
    handleCharSelection(char, id, value);
  };

  const handleCharSelection = (char, id, value) => {
    const currentDisplay = document.getElementById(id);
    const newDisplay = charsKey[char][value];
    currentDisplay.textContent = newDisplay;
  };

  const createCharsDiv = () => {
    let div = [];

    for (let char in chars) {
      div.push(
        <div key={chars[char].id}>
          <span id={chars[char].id}>None Selected</span>
          <br />
          <label>
            {`${char}`}
            <input
              className={chars[char].id}
              type="radio"
              name={`${char}`}
              value="1"
              onClick={() =>
                handleCharacteristics(char, chars[char].id, 1)
              }
            />
            <input
              className={chars[char].id}
              type="radio"
              name={`${char}`}
              value="2"
              onClick={() =>
                handleCharacteristics(char, chars[char].id, 2)
              }
            />
            <input
              className={chars[char].id}
              type="radio"
              name={`${char}`}
              value="3"
              onClick={() =>
                handleCharacteristics(char, char[char].id, 3)
              }
            />
            <input
              className={chars[char].id}
              type="radio"
              name={`${char}`}
              value="4"
              onClick={() =>
                handleCharacteristics(char, chars[char].id, 4)
              }
            />
            <input
              className={chars[char].id}
              type="radio"
              name={`${char}`}
              value="5"
              onClick={() =>
                handleCharacteristics(char, `${chars[char].id}`, 5)
              }
            />
          </label>
          <br />
        </div>
      );
    }
    setCharsDiv(div);
  };

  return !showReviewModal ? (
    ''
  ) : (
    <div id="review-window">
      <div id="review-form">
        <h1>Write Your Review</h1>
        <h3>About the {productName}</h3>

        {/* This div will ask the customer to fill in a star rating */}
        <div id="rate-by-star">
          <fieldset>
            <legend>Overall Rating</legend>
            {rating >= 1 ? (
              <FontAwesomeIcon
                id="star-1"
                icon={solid('star')}
                onClick={() => {
                  handleClick(setRating, 1);
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="star-1"
                icon={regular('star')}
                onClick={() => {
                  handleClick(setRating, 1);
                }}
              />
            )}
            {rating >= 2 ? (
              <FontAwesomeIcon
                id="star-2"
                icon={solid('star')}
                onClick={() => {
                  handleClick(setRating, 2);
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="star-2"
                icon={regular('star')}
                onClick={() => {
                  handleClick(setRating, 2);
                }}
              />
            )}
            {rating >= 3 ? (
              <FontAwesomeIcon
                id="star-3"
                icon={solid('star')}
                onClick={() => {
                  handleClick(setRating, 3);
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="star-3"
                icon={regular('star')}
                onClick={() => {
                  handleClick(setRating, 3);
                }}
              />
            )}
            {rating >= 4 ? (
              <FontAwesomeIcon
                id="star-4"
                icon={solid('star')}
                onClick={() => {
                  handleClick(setRating, 4);
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="star-4"
                icon={regular('star')}
                onClick={() => {
                  handleClick(setRating, 4);
                }}
              />
            )}
            {rating === 5 ? (
              <FontAwesomeIcon
                id="star-5"
                icon={solid('star')}
                onClick={() => {
                  handleClick(setRating, 5);
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="star-5"
                icon={regular('star')}
                onClick={() => {
                  handleClick(setRating, 5);
                }}
              />
            )}
          </fieldset>
        </div>

        {/* This div will ask the customer if they recommend the product*/}
        <div id="recommend">
          <fieldset>
            <legend>Do you recommend this product?</legend>
            <div>
              <label>
                <input
                  type="radio"
                  name="rec"
                  value="yes"
                  onClick={() => handleClick(setRecommend, true)}
                />{' '}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="rec"
                  value="no"
                  onClick={() => handleClick(setRecommend, false)}
                />{' '}
                No
              </label>
            </div>
          </fieldset>
        </div>
        {/* // This div asks the customer about different product characteristics */}
        <div id="characteristics-radios">
          <fieldset>
            <legend>Characteristics</legend>
            {charsDiv}
            <p> {`lowest(1)...........highest(5)`} </p>
          </fieldset>
        </div>

        {/* This div will alllow the user to enter a summary */}
        <div id="review-summary-input">
          <fieldset>
            <legend>Summary</legend>
            <div>
              <textarea
                maxLength="60"
                placeholder={'Example: Best purchse ever!'}
                rows="2"
                cols="35"
                onChange={(e) => handleChange(setSummary, e.target.value)}
              ></textarea>
            </div>
          </fieldset>
        </div>

        {/* This div will allow a user to enter a review body */}

        <div id="review-body-input">
          <fieldset>
            <legend>Review</legend>
            <div>
              <textarea
                minLength="50"
                maxLength="1000"
                placeholder={'Why did you like this product or not?'}
                rows="3"
                cols="70"
                required="required"
                wrap="hard"
                onChange={(e) => handleChange(setBody, e.target.value)}
              ></textarea>
            </div>
            <span>
              {body.length < 50
                ? `Minimum required characters left: ${50 - body.length}`
                : 'Minimum Reached'}
            </span>
          </fieldset>
        </div>

        {/* This div will allow the user to upload photos to the review */}

        <div>
          <fieldset>
            <legend>Upload your photos</legend>
            <input
              id="photo-input"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={() => handlePhotos()}
            ></input>
            <div id="images"></div>
            {addPhotoDiv}
          </fieldset>
        </div>

        {/* This div will ask the user to enter their enter their name */}

        <div id="name-input">
          <fieldset>
            <legend>What is your Name?</legend>
            <input
              type="text"
              className="name-input"
              placeholder="Example: jackson11!"
              maxLength="60"
              size="35"
              onChange={(e) => handleChange(setName, e.target.value)}
            ></input>
            <br />
            <span>
              For privacy reasons, do not use your full name or email address
            </span>
          </fieldset>
        </div>

        {/* This div will ask the user to enter their email */}

        <div id="email-input">
          <fieldset>
            <legend>Your email</legend>
            <input
              type="email"
              className="email-input"
              placeholder="Example: jackson11@email.com"
              maxLength="60"
              size="35"
              onChange={(e) => handleChange(setEmail, e.target.value)}
            ></input>
            <br />
            <span>For authentication reasons, you will not be emailed</span>
          </fieldset>
          <br />
          <input type="submit" onClick={(e) => handleSubmit()}></input>
        </div>
      </div>
    </div>
  );
}

export default SubmitReview;
