import React, { useState, useEffect } from 'react';
import markAnswerAsHelpful from './helper_functions/markAnswerAsHelpful.js';

function Answer({ answer_id, answerer_name, body, date, answer_helpfulness }) {
  const [helpCount, setHelpCount] = useState(answer_helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);

  function incrementHelpCount() {
    markAnswerAsHelpful(answer_id);
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
    <div className="answer">
      <div>
        <h3>A:</h3>
        <p>{body}</p>
      </div>

      <div className="answer-options">
        <p>
          by {answerer_name}, {date}
        </p>
        <div className="answer-helpful">
          <div>Helpful?</div>
          {userVote}
        </div>
        <div className="answer-report">Report</div>
      </div>
    </div>
  );
}

export default Answer;
