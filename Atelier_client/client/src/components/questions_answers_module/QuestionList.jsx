import React, { useState, useEffect, useRef } from 'react';
import Question from './Question.jsx';
import ModalQuestion from './ModalQuestion.jsx';

function QuestionList({
  displayList,
  productName,
  productId,
  showMoreQuestions,
  setCountShown,
  handleShowMoreQuestions,
}) {
  const [isModel, setIsModel] = useState(false);

  const showModal = () => {
    setIsModel(!isModel);
  };

  // const handleIncrementCount = () => {
  //   setCountShown((prevState) => prevState + 2);
  //   handleShowMoreQuestions();
  // };

  const model = isModel ? (
    <ModalQuestion
      productName={productName}
      productId={productId}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  const showMoreQuestionsButton = showMoreQuestions ? (
    <button onClick={handleShowMoreQuestions}> More Answered Questions </button>
  ) : null;

  return (
    <div>
      {model}
      {displayList.map((q) => (
        <Question
          productName={productName}
          productId={productId}
          key={q.question_id}
          question_id={q.question_id}
          body={q.question_body}
          helpfulness={q.question_helpfulness}
        />
      ))}
      <div id="questions-buttons">
        {showMoreQuestionsButton}
        <button onClick={showModal}> Add Question + </button>
      </div>
    </div>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
