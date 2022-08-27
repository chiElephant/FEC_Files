import React, { useState } from 'react';


function Expanded (props) {

  const [openModal, setOpenModal]= useState(false)
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='main-img-container'>
          <button onClick={() => {
            props.changeViewDefault()
          }}>X</button>
          <div>This is the left arrow</div>
          <div>This is the main image</div>
          <img src={props.selectedPhoto}></img>
          <div>This is the right arrow</div>
        </div>
        <div className='expanded-photo-gallery'>
          <div>This is the photo gallery
            {props.photos.map((photo, index) => {
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
      </div>
    </div>
  )
}

export default Expanded;