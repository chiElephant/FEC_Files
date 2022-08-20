import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

function AnswerList(props) {
  return (
    <div>
      Answer List
      <ul>
        <Answer />
      </ul>
    </div>
  );
}

export default AnswerList;
