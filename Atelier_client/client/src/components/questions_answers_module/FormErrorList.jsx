import React, { useState, useEffect } from 'react';

function FormErrorList({ validEntries, inputs }) {
  return (
    <div id="questions-answers-form-error">
      <label>You must enter the following:</label>
      <ol type="1">
        {inputs.map((input) => {
          if (validEntries[input.name] === false) {
            return <li key={input.id}>{input.errorMessage}</li>;
          }
          return null;
        })}
      </ol>
    </div>
  );
}

export default FormErrorList;
