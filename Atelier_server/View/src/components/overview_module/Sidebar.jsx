import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Sidebar({
  selectedIndex,
  previousPhoto,
  nextPhoto,
  containerRef,
  selectedStyle,
  handleChangePhoto,
}) {
  return (
    <div className="sidebar">
      <KeyboardArrowLeftIcon
        className="arrow-up"
        onClick={previousPhoto}
        style={
          selectedIndex === 0 ? { color: 'transparent' } : { color: 'gray' }
        }
      />
      <div className="photo-container" ref={containerRef}>
        {selectedStyle.photos.map((photo, index) => (
          <button
            key={photo.url}
            className="image-btn"
            onClick={(e) => handleChangePhoto(e)}
          >
            <img
              className={`${
                index === selectedIndex
                  ? 'style-other-imgs-selected'
                  : 'style-other-imgs'
              }`}
              src={photo.url}
              data={index}
              key={photo.url}
              alt="Not available"
            />
          </button>
        ))}
      </div>

      <KeyboardArrowRightIcon
        className="arrow-down"
        onClick={nextPhoto}
        style={
          selectedIndex < selectedStyle.photos.length - 1
            ? { color: 'gray' }
            : { color: 'transparent' }
        }
      />
    </div>
  );
}
