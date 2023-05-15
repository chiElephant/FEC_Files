import React from 'react';
import Button from '@mui/material/Button';
import ReactImageZoom from 'react-image-zoom';

function Expanded({
  photos,
  nextPhoto,
  previousPhoto,
  changeViewDefault,
  selectedPhoto,
  changeSelectedPhoto,
  selectedIndex,
}) {
  const imageProps = {
    img: selectedPhoto,
    zoomPosition: 'original',
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <Button
          variant="text"
          className="x"
          onClick={() => {
            changeViewDefault();
          }}
        >
          X
        </Button>
        <div className="main-img-container">
          <div className="main-img-and-arrows">
            <Button
              onClick={(e) => {
                previousPhoto(e);
              }}
              variant="text"
            >
              &lt;
            </Button>
            <ReactImageZoom {...imageProps} />
            <Button
              onClick={(e) => {
                nextPhoto(e);
              }}
            >
              &gt;
            </Button>
          </div>
        </div>
        <div className="expanded-photo-gallery">
          {photos.map((photo, index) => {
            if (index === selectedIndex) {
              return (
                <img
                  onClick={() => {
                    changeSelectedPhoto(index);
                  }}
                  className="style-other-imgs-selected"
                  src={photo.url}
                  key={index}
                />
              );
            }
            return (
              <img
                onClick={() => {
                  changeSelectedPhoto(index);
                }}
                className="style-other-imgs"
                src={photo.url}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Expanded;
