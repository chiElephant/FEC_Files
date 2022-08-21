import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

function AnswerList({ answerList }) {
  return (
    <div>
      <div>
        {answerList.map((a) => (
          <Answer
            key={a.answer_id}
            answerer_name={a.answerer_name}
            body={a.body}
            date={a.date}
            helpfulness={a.helpfulness}
          />
        ))}
      </div>
    </div>
  );
}

export default AnswerList;
