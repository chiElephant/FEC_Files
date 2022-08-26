import renderer from 'react-test-renderer';
import Overview from '../components/Overview.jsx';
import React from 'react';

it('Overview Component renders correctly', () => {
  const tree = renderer.create(<Overview />).toJSON();
  expect(tree).toMatchSnapshot();
});
