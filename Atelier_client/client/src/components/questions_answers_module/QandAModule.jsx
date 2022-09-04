import React, { useState, useEffect } from 'react';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import getQuestions from './helper_functions/getQuestions.js';

const PAGE = 1;
const COUNT = 100;

function QandAModule({ product_id, product_name }) {
  // set props at {product_id, product_name}
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getQuestions(product_id, PAGE, COUNT, setQuestionList);
  }, []);

  return (
    <div id="QandAtop">
      <h1>Questions & Answers</h1>
      <SearchQ questionList={questionList} />
      <QuestionList
        questionList={questionList}
        productName={product_name}
        productId={product_id}
      />
    </div>
  );
}

export default QandAModule;
