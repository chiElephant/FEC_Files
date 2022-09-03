import React, { useState, useEffect } from 'react';
import markAnswerAsHelpful from './helper_functions/markAnswerAsHelpful.js';
import reportAnswer from './helper_functions/reportAnswer.js';
import AnswerPhotosList from './AnswerPhotosList.jsx';

function Answer({
  answer_id,
  answerer_name,
  body,
  date,
  answer_helpfulness,
  photos,
}) {
  const [helpCount, setHelpCount] = useState(answer_helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);
  const [reportUser, setReportUser] = useState(false);

  function incrementHelpCount() {
    markAnswerAsHelpful(answer_id);
    setHelpCount((prevState) => prevState + 1);
    setAllowUserVote(true);
  }

  function handleReportAnswer() {
    reportAnswer(answer_id);
    setReportUser(true);
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

  let report;
  if (reportUser) {
    report = <div className="answer-report">Reported</div>;
  } else {
    report = (
      <div className="answer-report" onClick={handleReportAnswer}>
        Report
      </div>
    );
  }

  return (
    <div className="answer">
      <div>
        <h3>A:</h3>
        <p>{body}</p>
      </div>
      <AnswerPhotosList photos={photos} />
      <div className="answer-options">
        <p>
          by {answerer_name}, {date}
        </p>
        <div className="answer-helpful">
          <div>Helpful?</div>
          {userVote}
        </div>
        {report}
      </div>
    </div>
  );
}

export default Answer;
