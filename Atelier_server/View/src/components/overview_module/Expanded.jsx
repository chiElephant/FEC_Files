import React from 'react';
import ReactImageZoom from 'react-image-zoom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sidebar from './Sidebar.jsx';

function Expanded({
  nextPhoto,
  previousPhoto,
  changeViewDefault,
  selectedIndex,
  selectedPhoto,
  selectedStyle,
  containerRef,
  handleChangePhoto,
}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          className="close-modal-btn"
          onClick={() => {
            changeViewDefault();
          }}
        >
          x
        </button>

        <div className="main-img-container">
          <div className="main-img-and-arrows">
            <KeyboardArrowLeftIcon
              className="arrow-up"
              onClick={previousPhoto}
              style={
                selectedIndex === 0
                  ? { color: 'transparent' }
                  : { color: 'gray' }
              }
            />
            <div className="modal-img">
              <ReactImageZoom
                img={selectedPhoto}
                height={600}
                zoomPosition="original"
                alt="Not Available"
              />
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
        </div>
        <Sidebar
          selectedIndex={selectedIndex}
          previousPhoto={previousPhoto}
          nextPhoto={nextPhoto}
          containerRef={containerRef}
          selectedStyle={selectedStyle}
          handleChangePhoto={handleChangePhoto}
        />
      </div>
    </div>
  );
}

export default Expanded;
