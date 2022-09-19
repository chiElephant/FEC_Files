import React, { useState } from 'react';
import AnswerList from './AnswerList.jsx';
import markQuestionAsHelpful from './helper_functions/markQuestionAsHelpful.js';
import getAnswers from './helper_functions/getAnswers.js';
import ModalAnswer from './ModalAnswer.jsx';

function Question({
  question_id,
  body,
  helpfulness,
  productName,
  productId,
  answers,
}) {
  const [answerList, setAnswerList] = useState([...answers]);
  const firstTwo = answers.slice(0, 2);
  const [displayList, setDisplayList] = useState(firstTwo);
  const [showMoreAnswers, setShowMoreAnswers] = useState(answers.length > 2);
  const [helpCount, setHelpCount] = useState(helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleSeeMoreAnswers = () => {
    setDisplayList(answerList);
    setShowMoreAnswers(false);
  };

  const handleCollapseAnswers = () => {
    const sliceDisplayList = displayList.slice(0, 2);

    setDisplayList(sliceDisplayList);
    setShowMoreAnswers(true);
  };

  const showModal = () => {
    setIsModal(!isModal);
  };

  const incrementHelpCount = () => {
    markQuestionAsHelpful(question_id);
    setHelpCount((prevState) => prevState + 1);
    setAllowUserVote(true);
  };

  const handleFetchAnswers = () => {
    getAnswers(question_id, setAnswerList, setDisplayList);
  };
  let userVote;
  if (allowUserVote) {
    userVote = <div className="question-yes">Yes({helpCount})</div>;
  } else {
    userVote = (
      <div className="question-yes" onClick={incrementHelpCount}>
        Yes({helpCount})
      </div>
    );
  }

  const modal = isModal ? (
    <ModalAnswer
      handleFetchAnswers={handleFetchAnswers}
      productName={productName}
      productId={productId}
      question_id={question_id}
      questionBody={body}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  return (
    <div>
      {modal}
      <div className="question">
        <div>
          <h2>Q:</h2>
          <h3>{body}</h3>
        </div>

        <div className="question-options">
          <div className="question-helpful">
            <div>Helpful?</div>
            {userVote}
          </div>
          <div
            data-testid="test-answer"
            className="question-add-answer"
            onClick={showModal}
          >
            Add Answer
          </div>
        </div>
      </div>
      <AnswerList
        answerListLength={answerList.length}
        displayList={displayList}
        showMoreAnswers={showMoreAnswers}
        handleSeeMoreAnswers={handleSeeMoreAnswers}
        handleCollapseAnswers={handleCollapseAnswers}
      />
    </div>
  );
}

export default Question;
