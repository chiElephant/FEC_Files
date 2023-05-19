import React, { useState, useEffect, useRef } from 'react';
import ImageModal from './ImageModal.jsx';
import Sidebar from './Sidebar.jsx';

function Gallery({ currentStyle, altPhoto }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const containerRef = useRef(null);
  const minRangeRef = useRef(0);
  const maxRangeRef = useRef(2);

  useEffect(() => {
    const setDefaultStyle = () => {
      if (currentStyle.photos.length > 0) {
        setSelectedPhoto(currentStyle.photos[selectedIndex].url);
      } else {
        setSelectedPhoto(altPhoto);
      }
    };

    setDefaultStyle();
  }, [selectedIndex, currentStyle]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('data')));
  };

  const handleChangeView = () => {
    setIsModal((prevState) => !prevState);
  };

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      const newPhoto = currentStyle.photos[newIndex].url || altPhoto;
      setSelectedPhoto(newPhoto);
      if (selectedIndex <= maxRangeRef.current) {
        const container = containerRef.current;
        if (container) {
          container.scrollBy({ top: -40, left: 0, behavior: 'smooth' });
          maxRangeRef.current--;
          minRangeRef.current--;
        }
      }
    }
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex < currentStyle.photos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      const newPhoto = currentStyle.photos[newIndex].url || altPhoto;
      setSelectedPhoto(newPhoto);
      if (selectedIndex > maxRangeRef.current) {
        const container = containerRef.current;
        container.scrollBy({ top: 40, left: 0, behavior: 'smooth' });
        maxRangeRef.current++;
        minRangeRef.current++;
      }
    }
  };

  if (currentStyle && selectedPhoto) {
    return (
      <div className="gallery-container">
        <div>
          <button className="image-btn" onClick={() => handleChangeView()}>
            <img className="main-img" src={selectedPhoto} alt={altPhoto} />
          </button>
        </div>
        <Sidebar
          selectedIndex={selectedIndex}
          previousPhoto={previousPhoto}
          nextPhoto={nextPhoto}
          containerRef={containerRef}
          currentStyle={currentStyle}
          handleChangePhoto={handleChangePhoto}
          altPhoto={altPhoto}
          displayNav
        />
        {isModal ? (
          <ImageModal
            nextPhoto={nextPhoto}
            previousPhoto={previousPhoto}
            closeModal={() => handleChangeView()}
            photos={currentStyle.photos}
            selectedPhoto={selectedPhoto}
            handleChangePhoto={handleChangePhoto}
            selectedIndex={selectedIndex}
            currentStyle={currentStyle}
            containerRef={containerRef}
            altPhoto={altPhoto}
          />
        ) : null}
      </div>
    );
  }
}

export default Gallery;
