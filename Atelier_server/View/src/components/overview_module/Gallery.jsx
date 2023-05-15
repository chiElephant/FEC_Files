import React, { useState, useEffect, useRef } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Expanded from './Expanded.jsx';

function Gallery({ styles }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [view, setView] = useState('default');

  useEffect(() => {
    function setDefaultStyle() {
      styles.filter((style) => {
        if (style.default_style) {
          setSelectedStyle(style);
          setSelectedPhoto(style.photos[selectedIndex].url);
        }
      });
    }

    setDefaultStyle();
  }, [styles]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('index')));
  };

  const handleChangeView = (viewType) => {
    setView(viewType);
  };

  let minRange = 0;
  let maxRange = 2;

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex <= maxRange) {
        const container = document.getElementById('photo-container');
        if (container) {
          container.scrollBy({ top: -40, left: 0, behaviour: 'smooth' });
          maxRange--;
          minRange--;
        }
      }
    }
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex < selectedStyle.photos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex > maxRange) {
        const container = document.getElementById('photo-container');
        container.scrollBy({ top: 40, left: 0, behaviour: 'smooth' });
        maxRange++;
        minRange++;
      }
    }
  };

  if (styles !== null) {
    if (
      view === 'default' &&
      selectedStyle !== null &&
      selectedPhoto !== null
    ) {
      return (
        <div className="gallery-container">
          <img
            className="main-img"
            src={selectedPhoto}
            onClick={() => handleChangeView('expanded')}
            alt="Not Available"
          />
          <div className="sidebar">
            {selectedIndex !== 0 ? (
              <KeyboardArrowUpIcon
                className="arrow-up"
                onClick={previousPhoto}
              />
            ) : null}
            <div className="photo-container" id="photo-container">
              {selectedStyle.photos.map((photo, index) => {
                if (index === selectedIndex) {
                  return (
                    <img
                      onClick={(e) => {
                        handleChangePhoto(e);
                      }}
                      className="style-other-imgs-selected"
                      src={photo.url}
                      // index={index}
                      key={photo.url}
                      alt="Not vailable"
                    />
                  );
                }
                return (
                  <img
                    onClick={(e) => {
                      handleChangePhoto(e);
                    }}
                    className="style-other-imgs"
                    src={photo.url}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
            {selectedIndex < selectedStyle.photos.length - 1 ? (
              <KeyboardArrowDownIcon
                className="arrow-down"
                onClick={nextPhoto}
              />
            ) : null}
          </div>
        </div>
      );
    }
    if (view === 'expanded') {
      return (
        <Expanded
          nextPhoto={nextPhoto}
          previousPhoto={previousPhoto}
          changeViewDefault={() => handleChangeView('default')}
          photos={selectedStyle.photos}
          selectedPhoto={selectedPhoto}
          changeSelectedPhoto={handleChangePhoto}
          selectedIndex={selectedIndex}
        />
      );
    }
  }
}

export default Gallery;
