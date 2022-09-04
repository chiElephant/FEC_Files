import React, { useState, useEffect } from 'react';
import { Axios } from 'axios';
import AnswerList from './AnswerList.jsx';
import markQuestionAsHelpful from './helper_functions/markQuestionAsHelpful.js';
import getAnswers from './helper_functions/getAnswers.js';
import ModalAnswer from './ModalAnswer.jsx';

const RESULTS_PER_PAGE = 100;

function Question({ question_id, body, helpfulness, productName, productId }) {
  const [answerList, setAnswerList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [page, setPage] = useState(1);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);
  const [helpCount, setHelpCount] = useState(helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const answerListLength = answerList.length;
  const displayListLength = displayList.length;

  useEffect(() => {
    // getAnswers(question_id, page, count, setAnswerList);
    getAnswers(
      question_id,
      page,
      RESULTS_PER_PAGE,
      setAnswerList,
      setPage,
      displayList,
      setDisplayList,
      setShowMoreAnswers
    );
  }, [page]);

  useEffect(() => {
    if (countShown > 2) {
      console.log('2nd useEffect fire');
      const grabNextTwo = answerList.slice(countShown - 2, countShown);
      console.log('grabNextTwo: ', grabNextTwo);
      const newList = [...displayList, ...grabNextTwo];
      setDisplayList(newList);
    }
  }, [countShown]);

  const handleSeeMoreAnswers = () => {
    setCountShown((prevState) => prevState + 2);
    if (
      displayListLength === answerListLength - 2 ||
      displayListLength === answerListLength - 1
    ) {
      setShowMoreAnswers(false);
    }
  };

  function showModal() {
    setIsModal(!isModal);
  }

  function incrementHelpCount() {
    markQuestionAsHelpful(question_id);
    setHelpCount((prevState) => prevState + 1);
    setAllowUserVote(true);
  }

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
      productName={productName}
      productId={productId}
      question_id={question_id}
      questionBody={body}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  // console.log(answerList);

  return (
    <div>
      {modal}
      <div className="question">
        <div>
          <h3>Q:</h3>
          <h3>{body}</h3>
        </div>

        <div className="question-options">
          <div className="question-helpful">
            <div>Helpful?</div>
            {userVote}
          </div>
          <div className="question-add-answer" onClick={showModal}>
            Add Answer
          </div>
        </div>
      </div>
      <AnswerList
        displayList={displayList}
        showMoreAnswers={showMoreAnswers}
        handleSeeMoreAnswers={handleSeeMoreAnswers}
      />
    </div>
  );
}

export default Question;
