import React, { useState, useEffect } from 'react';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import getQuestions from './helper_functions/getQuestions.js';
import useDebounce from './custom_hooks/useDebounce.jsx';
import useFilterByMatchingText from './custom_hooks/useFilterByMatchingText.jsx';

const RESULTS_PER_PAGE = 100;

function QandAModule({ product_id, product_name }) {
  const [questionList, setQuestionList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [page, setPage] = useState(1);
  const [showMoreQuestions, setShowMoreQuestions] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 1000);

  const filteredList = useFilterByMatchingText(
    questionList,
    searchText,
    'question_body'
  );

  const questionListLength = questionList.length;
  const displayListLength = displayList.length;

  // console.log('filteredList: ', filteredList);
  console.log('debouncedSearchText: ', debouncedSearchText);
  // console.log('shouldSearch: ', shouldSearch);
  // console.log('searchText length: ', searchText.length);
  //grab all questions
  useEffect(() => {
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

  //as we incement count, also increment questions to display by two
  useEffect(() => {
    if (countShown > 2) {
      const grabNextTwo = questionList.slice(countShown - 2, countShown);

      const newList = [...displayList, ...grabNextTwo];
      setDisplayList(newList);
    }
  }, [countShown]);

  useEffect(() => {
    if (debouncedSearchText.length >= 3) {
      setShouldSearch(true);
      setShowMoreQuestions(false);
    } else {
      setShowMoreQuestions(true);
      setShouldSearch(false);
    }
  }, [debouncedSearchText]);

  const handleUpdateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleShowMoreQuestions = () => {
    setCountShown((prevState) => prevState + 2);
    if (
      displayListLength === questionListLength - 2 ||
      displayListLength === questionListLength - 1
    ) {
      setShowMoreQuestions(false);
    }
  };

  const list = shouldSearch ? (
    <QuestionList
      displayList={filteredList}
      productName={product_name}
      productId={product_id}
      showMoreQuestions={showMoreQuestions}
      setCountShown={setCountShown}
      handleShowMoreQuestions={handleShowMoreQuestions}
    />
  ) : (
    <QuestionList
      displayList={displayList}
      productName={product_name}
      productId={product_id}
      showMoreQuestions={showMoreQuestions}
      setCountShown={setCountShown}
      handleShowMoreQuestions={handleShowMoreQuestions}
    />
  );

  return (
    <div id="QandAtop">
      <h1>Questions & Answers</h1>
      <SearchQ
        handleUpdateSearchText={handleUpdateSearchText}
        questionList={questionList}
        searchText={searchText}
      />
      {list}
    </div>
  );
}

export default QandAModule;
