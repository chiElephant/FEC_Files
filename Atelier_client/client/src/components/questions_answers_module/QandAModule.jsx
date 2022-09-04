import React, { useState, useEffect } from 'react';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import getQuestions from './helper_functions/getQuestions.js';

const RESULTS_PER_PAGE = 100;

function QandAModule({ product_id, product_name }) {
  // set props at {product_id, product_name}
  const [questionList, setQuestionList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [page, setPage] = useState(1);
  const [showMoreQuestions, setShowMoreQuestions] = useState(false);
  const questionListLength = questionList.length;
  const displayListLength = displayList.length;

  //grab all questions
  useEffect(() => {
    console.log('1st useEffect fire');
    getQuestions(
      product_id,
      page,
      RESULTS_PER_PAGE,
      setQuestionList,
      setPage,
      displayList,
      setDisplayList,
      setShowMoreQuestions
    );
  }, [page]);

  useEffect(() => {
    if (countShown > 2) {
      console.log('2nd useEffect fire');
      const grabNextTwo = questionList.slice(countShown - 2, countShown);
      console.log('grabNextTwo: ', grabNextTwo);
      const newList = [...displayList, ...grabNextTwo];
      setDisplayList(newList);
    }
  }, [countShown]);

  const handleShowMoreQuestions = () => {
    setCountShown((prevState) => prevState + 2);
    if (
      displayListLength === questionListLength - 2 ||
      displayListLength === questionListLength - 1
    ) {
      setShowMoreQuestions(false);
    }
  };

  console.log('questionList: ', questionList);
  console.log('displayList: ', displayList);
  console.log('countShown: ', countShown);
  console.log('showMoreQuestions: ', showMoreQuestions);
  console.log('displayListLength: ', displayListLength);
  return (
    <div id="QandAtop">
      <h1>Questions & Answers</h1>
      <SearchQ questionList={questionList} />
      <QuestionList
        displayList={displayList}
        productName={product_name}
        productId={product_id}
        showMoreQuestions={showMoreQuestions}
        setCountShown={setCountShown}
        handleShowMoreQuestions={handleShowMoreQuestions}
      />
    </div>
  );
}

export default QandAModule;
