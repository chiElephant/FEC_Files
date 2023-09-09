import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import useGetQuestions from './custom_hooks/useGetQuestions.jsx';
import useDebounce from './custom_hooks/useDebounce.jsx';
import useFilterByMatchingText from './custom_hooks/useFilterByMatchingText.jsx';
import '../../styles/questions-answers-styles.css';

function QandAModule({ questions_answers, product_id, product_name }) {
  const [qaData, setQaData] = useState(questions_answers);
  const [displayList, setDisplayList] = useState(qaData.slice(0, 2));
  const [showMoreQuestions, setShowMoreQuestions] = useState(qaData.length > 2);
  const [displayFilteredList, setDisplayFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterMode, setFilterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchText = useDebounce(searchText, 1500);

  const filteredList = useFilterByMatchingText(
    displayList,
    searchText,
    'question_body'
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(`/questions/${product_id}`);
      setQaData(res.data);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    if (debouncedSearchText.length !== 0) {
      setDisplayFilteredList(filteredList);
      setFilterMode(true);
    } else {
      setFilterMode(false);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    loading ? fetchData() : null;
  }, [loading]);

  const handleUpdateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleShowMoreQuestions = () => {
    setDisplayList(qaData);
    setShowMoreQuestions(false);
  };

  const handleCollapseQuestions = () => {
    setDisplayList(qaData.slice(0, 2));
    setShowMoreQuestions(true);
  };

  const handleFetchQuestions = () => {
    setLoading(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading....🤹</div>;
  }

  return (
    <div id="QandA-main">
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <SearchQ
          handleUpdateSearchText={handleUpdateSearchText}
          searchText={searchText}
        />
        <QuestionList
          handleFetchQuestions={handleFetchQuestions}
          displayList={filterMode ? displayFilteredList : displayList}
          productName={product_name}
          productId={product_id}
          showMoreQuestions={showMoreQuestions}
          handleShowMoreQuestions={handleShowMoreQuestions}
          handleCollapseQuestions={handleCollapseQuestions}
          filterMode={filterMode}
        />
      </div>
    </div>
  );
}

export default QandAModule;
