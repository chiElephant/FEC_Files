import React, { useState, useEffect } from 'react';

function Answer({ answerer_name, body, date, helpfulness }) {
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
          <div className="answer-yes">Yes({helpfulness})</div>
        </div>
        <div className="answer-report">Report</div>
      </div>
    </div>
  );
}

export default Answer;
