import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import preloadImages from '../global-helpers/preloadImages.jsx';
import Expanded from './Expanded.jsx';

function Gallery({ selectedStyle }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState('default');
  const [selectedPhoto, setSelectedPhotot] = useState(
    selectedStyle.photos[selectedIndex].url
  );

  const handleChangeViewExpanded = () => {
    setView('expanded');
  };

  const handleChangeViewDefault = () => {
    setView('default');
  };

  const handleChangePhoto = (index) => {
    setSelectedIndex(index);
  };

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      setSelectedIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex < selectedStyle.photos.length - 1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
    }
  };

  // if (view === 'default' && selectedStyle.photos.length > 0) {
  //   const selectedPhoto = selectedStyle.photos[selectedIndex].url;
  // }

  return (
    <div className="gallery-container">
      <img
        className="main-img"
        alt="Image"
        src={selectedPhoto}
        // loading="lazy"
        onClick={handleChangeViewExpanded}
      />

      {/* <div className="sidebar">
          {selectedIndex !== 0 && (
            <KeyboardArrowUpIcon className="arrow-up" onClick={previousPhoto} />
          )}
          <div className="photo-container" id="photo-container">
            {selectedStyle.photos.map((photo, index) => (
              <img
                onClick={() => handleChangePhoto(index)}
                className={
                  index === selectedIndex
                    ? 'style-other-imgs-selected'
                    : 'style-other-imgs'
                }
                src={photo.url}
                key={index}
              />
            ))}
          </div>
          {selectedIndex < selectedStyle.photos.length - 1 && (
            <KeyboardArrowDownIcon className="arrow-down" onClick={nextPhoto} />
          )}
        </div> */}
    </div>
  );
}

// if (view === 'expanded') {
//   const selectedPhoto = selectedStyle.photos[selectedIndex].url;

//   return (
//     <Expanded
//       photos={selectedStyle.photos}
//       nextPhoto={nextPhoto}
//       previousPhoto={previousPhoto}
//       changeViewDefault={handleChangeViewDefault}
//       selectedPhoto={selectedPhoto}
//       changeSelectedPhoto={handleChangePhoto}
//       selectedIndex={selectedIndex}
//     />
//   );
// }

// return null;

export default Gallery;
