// import React from 'react';
// import renderer from 'react-test-renderer';
// import QandAModule from '../components/questions_answers_module/QandAModule.jsx';

// test('QandAModule renders correctly', () => {
//   const tree = renderer.create(<QandAModule />).toJSON();

//   expect(tree).toMatchSnapshot();
// });

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QandAModule from '../components/questions_answers_module/QandAModule.jsx';

describe('Questions and Answers renders correctly', () => {
  test('Questions & Answers text is displayed', () => {
    const { getByText } = render(<QandAModule />);
    expect(getByText(/Questions & Answers/i)).toBeInTheDocument();
  });

  test('Questions & Answers text is displayed', () => {
    const { getByText } = render(<QandAModule />);
    expect(getByText(/Questions & Answers/i)).toBeInTheDocument();
  });
});
