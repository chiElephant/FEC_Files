import React, { useState } from 'react';


function Expanded (props) {

  const [openModal, setOpenModal]= useState(false);

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='main-img-container'>
          <button onClick={() => {
            props.changeViewDefault()
          }}>X</button>
          <div className='main-img-and-arrows'>
            <button onClick={(e) => {
              props.previousPhoto(e);
            }}>&lt;</button>
            <img src={props.selectedPhoto}></img>
            <button onClick={(e) => {
              props.nextPhoto(e);
            }}>&gt;</button>
          </div>
        </div>
        <div className='expanded-photo-gallery'>
          {props.photos.map((photo, index) => {

            if (index === props.selectedIndex) {
              return (
                <img
                  onClick={(e) => {
                    handleChangePhoto(e);
                  }}
                  className="style-other-imgs-selected"
                  src={photo.url}
                  index={index}
                ></img>
              );
            } else {
              return (
                <img
                  onClick={(e) => {
                    props.changeSelectedPhoto(e);
                  }}
                  className="style-other-imgs"
                  src={photo.url}
                  index={index}
                ></img>
              );
            }

          })}
        </div>
      </div>
    </div>
  )
}

export default Expanded;