import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

function QuestionList({ questionList }) {
  // console.log('questionList: ', questionList);
  return (
    <div>
      {questionList.map((q) => (
        <Question
          key={q.question_id}
          question_body={q.question_body}
          question_helpfulness={q.question_helpfulness}
          question_id={q.question_id}
          reported={q.reported}
        />
      ))}
      <div>
        <button> More Answered Questions </button>
        <button> Add Question + </button>
      </div>
    </div>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
