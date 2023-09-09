import React, { useState } from 'react';
import Question from './Question.jsx';
import ModalQuestion from './ModalQuestion.jsx';
import useAutoScroll from './custom_hooks/useAutoScroll.jsx';

function QuestionList({
  displayList,
  productName,
  productId,
  showMoreQuestions,
  handleShowMoreQuestions,
  handleFetchQuestions,
  handleCollapseQuestions,
  filterMode,
}) {
  const [isModal, setIsModal] = useState(false);
  const containerRef = useAutoScroll(displayList.length);

  const showModal = () => {
    setIsModal(!isModal);
  };

  const modal = isModal ? (
    <ModalQuestion
      handleFetchQuestions={handleFetchQuestions}
      productName={productName}
      productId={productId}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  const showMoreQuestionsButton = showMoreQuestions ? (
    <button onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</button>
  ) : (
    <button onClick={handleCollapseQuestions}>COLLAPSE</button>
  );

  return (
    <>
      {modal}
      <div data-testid="test-questions" ref={containerRef} id="question-list">
        {displayList.map((q) => (
          <Question
            answers={q.answers}
            productName={productName}
            productId={productId}
            key={q.question_id}
            question_id={q.question_id}
            body={q.question_body}
            helpfulness={q.question_helpfulness}
          />
        ))}
      </div>
      <div id="questions-buttons">
        {filterMode ? null : showMoreQuestionsButton}
        <button onClick={showModal}> ADD QUESTION + </button>
      </div>
    </>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
