import React, { useState, useEffect } from 'react';
import Expanded from './Expanded.jsx';

function Gallery(props) {
  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState('default');

  useEffect(() => {
    setSelectedStyle(props.style);
  }, [props.style]);

  useEffect(() => {
    const testAsync = async () => {
      const photos = await selectedStyle.photos;
      await console.log(photos);
      setSelectedPhoto(photos[selectedIndex].url);
    };
    testAsync();
    // setSelectedPhoto(selectedStyle.photos[0].url)
  }, [selectedStyle.photos]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    // console.log(e.target.src);
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('index')));
  };

  const handleChangeViewExpanded = () => {
    setView('expanded');
  };

  const handleChangeViewDefault = () => {
    setView('default');
  };

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      var newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      var newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
    }
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex < selectedStyle.photos.length - 1) {
      var newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      var newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
    }
  };

  if (Object.keys(selectedStyle).length && Object.keys(selectedPhoto).length) {
    if (view === 'default') {
      return (
        <div className="gallery-container">
          <img
            className="main-img"
            src={selectedPhoto}
            onClick={handleChangeViewExpanded}
          ></img>
          <div className="photo-container">
            {selectedStyle.photos.map((photo, index) => {
              if (index === selectedIndex) {
                return (
                  <img
                    onClick={(e) => {
                      handleChangePhoto(e);
                    }}
                    className="style-other-imgs-selected"
                    src={photo.url}
                    index={index}
                  ></img>
                );
              } else {
                return (
                  <img
                    onClick={(e) => {
                      handleChangePhoto(e);
                    }}
                    className="style-other-imgs"
                    src={photo.url}
                    index={index}
                  ></img>
                );
              }
            })}
          </div>
        </div>
      );
    } else if (view === 'expanded') {
      return (
        <Expanded
          nextPhoto={nextPhoto}
          previousPhoto={previousPhoto}
          changeViewDefault={handleChangeViewDefault}
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
