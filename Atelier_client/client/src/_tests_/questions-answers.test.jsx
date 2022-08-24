/* global test, expect */

import React from 'react';
import renderer from 'react-test-renderer';
import QandAModule from '../components/questions_answers_module/QandAModule.jsx';

test('QandAModule renders correctly', () => {
  const tree = renderer.create(<QandAModule />).toJSON();

  expect(tree).toMatchSnapshot();
});
