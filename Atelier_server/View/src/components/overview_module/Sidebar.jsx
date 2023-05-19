import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Sidebar({
  selectedIndex,
  previousPhoto,
  nextPhoto,
  containerRef,
  currentStyle,
  handleChangePhoto,
  altPhoto,
  displayNav,
}) {
  return (
    <div className="sidebar">
      {displayNav ? (
        <KeyboardArrowLeftIcon
          className="arrow-up"
          onClick={previousPhoto}
          style={
            selectedIndex === 0 ? { color: 'transparent' } : { color: 'gray' }
          }
        />
      ) : null}
      <div className="photo-container" ref={containerRef}>
        {currentStyle.photos.map((photo, index) => (
          <button
            key={photo.url || altPhoto}
            className="image-btn"
            onClick={(e) => handleChangePhoto(e)}
          >
            <img
              className={
                index === selectedIndex
                  ? 'style-other-imgs-selected'
                  : 'style-other-imgs'
              }
              src={photo.url || altPhoto}
              data={index}
              key={photo.url || altPhoto}
              alt={altPhoto}
            />
          </button>
        ))}
      </div>
      {displayNav ? (
        <KeyboardArrowRightIcon
          className="arrow-down"
          onClick={nextPhoto}
          style={
            selectedIndex < currentStyle.photos.length - 1
              ? { color: 'gray' }
              : { color: 'transparent' }
          }
        />
      ) : null}
    </div>
  );
}
