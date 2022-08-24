import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import ModalQuestion from './ModalQuestion.jsx';

function QuestionList({ questionList, productName, productId }) {
  const [isModel, setIsModel] = useState(false);

  function showModal() {
    setIsModel(!isModel);
  }

  const model = isModel ? (
    <ModalQuestion
      productName={productName}
      productId={productId}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  return (
    <div>
      {model}
      {questionList.map((q) => (
        <Question
          productName={productName}
          productId={productId}
          key={q.question_id}
          question_id={q.question_id}
          body={q.question_body}
          helpfulness={q.question_helpfulness}
        />
      ))}
      <div>
        <button> More Answered Questions </button>
        <button onClick={showModal}> Add Question + </button>
      </div>
    </div>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
