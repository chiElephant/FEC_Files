import React, { useState, useEffect } from 'react';

function Gallery (props) {

  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [view, setView] = useState('default');

  useEffect(() => {
    setSelectedStyle(props.style);
  }, [props.style]);

  useEffect(() => {
    const testAsync = async () => {
      const photos = await selectedStyle.photos;
      await console.log(photos);
      setSelectedPhoto(photos[0].url);
    }
    testAsync();
    // setSelectedPhoto(selectedStyle.photos[0].url)
  }, [selectedStyle.photos])

  var handleChangePhoto = (e) => {
    e.preventDefault();
    // console.log(e.target.src);
    setSelectedPhoto(e.target.src);
  }

  if (Object.keys(selectedStyle).length && Object.keys(selectedPhoto).length) {
    if (view === 'default') {
      return (
        <div>
          <h1>Gallery Component</h1>
          <img className='main-img' src={selectedPhoto}></img>
          {
            selectedStyle.photos.map((photo, index) => {
              if (index > 0) {
                return (
                  <img onClick={(e) => {
                    handleChangePhoto(e);
                  }} className='style-other-imgs' src={photo.url}></img>
                )
              }
            })
          }
        </div>
      )
    } else if (view === 'expanded') {
      return (
        null
      )
    }

  }

}

export default Gallery;
