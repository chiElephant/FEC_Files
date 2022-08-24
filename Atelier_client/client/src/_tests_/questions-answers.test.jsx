/* global test, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../components/App';
import QandAModule from '../components/questions_answers_module/QandAModule.jsx';

test('renders the landing page', () => {
  render(<App />);
});

// QandAModule Module
// test('Questions & Answers module renders correctly', () => {
//   const tree = renderer.create(<QandAModule />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
