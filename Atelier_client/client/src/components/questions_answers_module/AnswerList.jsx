import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

function AnswerList({ displayList, showMoreAnswers, handleSeeMoreAnswers }) {
  const showMoreAnswersToggle = showMoreAnswers ? (
    <div onClick={handleSeeMoreAnswers}>See more answers</div>
  ) : null;

  return (
    <>
      <div>
        {displayList.map((a) => (
          <Answer
            key={a.answer_id}
            answer_id={a.answer_id}
            answerer_name={a.answerer_name}
            body={a.body}
            date={a.date}
            answer_helpfulness={a.helpfulness}
            photos={a.photos}
          />
        ))}
      </div>
      {showMoreAnswersToggle}
    </>
  );
}

export default AnswerList;
