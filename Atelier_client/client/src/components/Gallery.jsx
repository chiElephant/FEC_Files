import React, { useState, useEffect } from 'react';

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
      // await console.log(photos);
      setSelectedPhoto(photos[selectedIndex].url);
    };
    testAsync();
    // setSelectedPhoto(selectedStyle.photos[0].url)
  }, [selectedStyle.photos]);

  var handleChangePhoto = (e) => {
    e.preventDefault();
    // console.log(e.target.src);
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('index')));
  };

  if (Object.keys(selectedStyle).length && Object.keys(selectedPhoto).length) {
    if (view === 'default') {
      return (
        <div className="gallery-container">
          <img className="main-img" src={selectedPhoto}></img>
          <div className="photo-container">
            {selectedStyle.photos.map((photo, index) => {
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
            })}
          </div>
        </div>
      );
    } else if (view === 'expanded') {
      return null;
    }
  }
}

export default Gallery;
