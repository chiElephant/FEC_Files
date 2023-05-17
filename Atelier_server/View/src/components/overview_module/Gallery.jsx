import React, { useState, useEffect, useRef } from 'react';
import Expanded from './Expanded.jsx';
import Sidebar from './Sidebar.jsx';

function Gallery({ styles }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [view, setView] = useState('default');
  const containerRef = useRef(null);
  const minRangeRef = useRef(0);
  const maxRangeRef = useRef(2);

  // Set the default style
  useEffect(() => {
    const setDefaultStyle = () => {
      styles.forEach((style) => {
        if (style.default_style) {
          setSelectedStyle(style);
          setSelectedPhoto(style.photos[selectedIndex].url);
        }
      });
    };

    setDefaultStyle();
  }, [selectedIndex, styles]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('data')));
  };

  const handleChangeView = (viewType) => {
    setView(viewType);
  };

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
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
    if (selectedIndex < selectedStyle.photos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex > maxRangeRef.current) {
        const container = containerRef.current;
        container.scrollBy({ top: 40, left: 0, behavior: 'smooth' });
        maxRangeRef.current++;
        minRangeRef.current++;
      }
    }
  };

  // Default View
  if (view === 'default' && selectedStyle && selectedPhoto) {
    return (
      <div className="gallery-container">
        <div>
          <button
            className="image-btn"
            onClick={() => handleChangeView('expanded')}
          >
            <img className="main-img" src={selectedPhoto} alt="Not Available" />
          </button>
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
    );
  }

  // Expanded view modal
  if (view === 'expanded') {
    return (
      <Expanded
        nextPhoto={nextPhoto}
        previousPhoto={previousPhoto}
        changeViewDefault={() => handleChangeView('default')}
        photos={selectedStyle.photos}
        selectedPhoto={selectedPhoto}
        handleChangePhoto={handleChangePhoto}
        selectedIndex={selectedIndex}
        selectedStyle={selectedStyle}
        containerRef={containerRef}
      />
    );
  }
  // }
}

export default Gallery;
