import React, { useState, useEffect } from 'react';
import AnswerList from './AnswerList.jsx';
import markQuestionAsHelpful from './helper_functions/markQuestionAsHelpful.js';
import getAnswers from './helper_functions/getAnswers.js';

function Question({ question_body, question_helpfulness, question_id }) {
  const [answerList, setAnswerList] = useState([]);
  const [page, setPage] = useState(1);
  const [helpCount, setHelpCount] = useState(question_helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);

  useEffect(() => {
    getAnswers(question_id, page, setAnswerList);
  }, []);

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

  return (
    <div>
      <div className="question">
        <div>
          <h3>Q:</h3>
          <h3>{question_body}</h3>
        </div>

        <div className="question-options">
          <div className="question-helpful">
            <div>Helpful?</div>
            {userVote}
          </div>
          <div className="question-add-answer">Add Answer</div>
        </div>
      </div>
      <AnswerList answerList={answerList} />
    </div>
  );
}

export default Question;
