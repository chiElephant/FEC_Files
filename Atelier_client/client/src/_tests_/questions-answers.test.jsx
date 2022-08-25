import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import QandAModule from '../components/questions_answers_module/QandAModule.jsx';
import Question from '../components/questions_answers_module/Question.jsx';
import Answer from '../components/questions_answers_module/Answer.jsx';
import SearchQ from '../components/questions_answers_module/SearchQ.jsx';
import ModalAnswer from '../components/questions_answers_module/ModalAnswer.jsx';
import ModalQuestion from '../components/questions_answers_module/ModalQuestion.jsx';

describe('Questions and Answers renders correctly', () => {
  describe('QandAModule', () => {
    test('Questions & Answers heading is displayed', () => {
      render(<QandAModule />);
      const element = screen.getByRole('heading', {
        hidden: true,
        name: /questions & answers/i,
      });

      expect(element).toBeInTheDocument();
    });
  });

  describe('QuestionList', () => {
    test(`Should display a 'More Answered Questions' button`, () => {
      render(<QandAModule />);
      const element = screen.getByRole('button', {
        name: /more answered questions/i,
      });

      expect(element).toBeInTheDocument();
    });

    test(`Should display a 'Add Question +' button`, () => {
      render(<QandAModule />);
      const element = screen.getByRole('button', {
        name: /add question \+/i,
      });

      expect(element).toBeInTheDocument();
    });
  });

  describe('Question', () => {
    test(`Should display a 'Helpful?' option`, () => {
      render(<Question />);
      const element = screen.getByText(/helpful\?/i);

      expect(element).toBeInTheDocument();
    });

    test(`Should display a 'Add Question +' button`, () => {
      render(<Question />);
      const element = screen.getByText(/add answer/i);

      expect(element).toBeInTheDocument();
    });
  });

  describe('Answer', () => {
    test(`Should display a 'Helpful?' option`, () => {
      render(<Answer />);
      const element = screen.getByText(/helpful\?/i);

      expect(element).toBeInTheDocument();
    });
  });

  describe('SearchQ', () => {
    test(`Should display a 'Search' button`, () => {
      render(<SearchQ />);
      const element = screen.getByRole('button', {
        name: /search/i,
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe('ModalQuestion', () => {
    test(`Should display a 'Ask Your Question' heading`, () => {
      render(<ModalQuestion />);
      const element = screen.getByRole('heading', {
        name: /ask your question/i,
      });
      expect(element).toBeInTheDocument();
    });
  });

  describe('ModalAnswer', () => {
    test(`Should display a 'Submit your Answer' heading`, () => {
      render(<ModalAnswer />);
      const element = screen.getByRole('heading', {
        name: /submit your answer/i,
      });
      expect(element).toBeInTheDocument();
    });
  });
});
