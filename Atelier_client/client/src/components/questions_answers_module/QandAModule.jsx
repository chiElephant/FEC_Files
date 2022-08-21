import React, { useState, useEffect } from 'react';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import getQuestions from './helper_functions/getQuestions.js';

function QandAModule() {
  const [questionList, setQuestionList] = useState([]);
  const [productId, setProductId] = useState(71697);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getQuestions(productId, page, setQuestionList);
  }, []);

  return (
    <div>
      <h1>Questions & Answers</h1>
      <SearchQ />
      <QuestionList questionList={questionList} />
    </div>
  );
}

export default QandAModule;
