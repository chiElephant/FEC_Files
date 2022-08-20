import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

function QuestionList({ questionList }) {
  console.log('questionList: ', questionList);
  return (
    <div>
      Question List
      {questionList.map((q) => (
        <Question key={q.question_id} question={q} />
      ))}
      <ul>
        <Question />
      </ul>
      <div>
        <button> More Answered Questions </button>
        <AddQuestion />
      </div>
    </div>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
