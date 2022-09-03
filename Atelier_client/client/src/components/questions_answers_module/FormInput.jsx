import React, { useState, useEffect } from 'react';

function FormInput(props) {
  const {
    type,
    maxLength,
    placeholder,
    label,
    name,
    message,
    onChange,
    required,
    value,
  } = props;
  console.log(value);

  let input;
  switch (type) {
    case 'file':
      input = (
        <>
          <input
            id="formInput"
            name={name}
            type={type}
            multiple
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
          />
          <div id="answer-img">
            {value.map((item) => (
              <img key={item} src={item} />
            ))}
          </div>
        </>
      );
      break;
    case null:
      input = (
        <textarea
          id="formInput"
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
        />
      );
      break;
    default:
      input = (
        <input
          id="formInput"
          name={name}
          value={value}
          type={type}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
        />
      );
  }

  const entryTitle = required === true ? `${label}*` : label;

  return (
    <div id="form-entry">
      <label>{entryTitle}</label>
      {input}
      <div>{message}</div>
    </div>
  );
}

export default FormInput;
