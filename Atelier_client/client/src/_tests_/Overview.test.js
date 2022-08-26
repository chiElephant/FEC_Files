import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Overview from '../components/Overview.jsx';
import React from 'react';
import ProductInfo from '../components/ProductInfo.jsx';
import App from '../components/App.jsx';
import '@testing-library/jest-dom';

// it('Overview Component renders correctly', () => {
//   const tree = renderer.create(<Overview />).toJSON();
//   expect(tree).toMatchSnapshot();
// });


describe('Atelier topbar', () => {
    test('The Atelier Topbar renders correctly', () => {
      render (<App />);
      const element = screen.getByRole('heading', {
        name: /The RedBean Atelier App/i
      });
      expect(element).toBeInTheDocument();
  });
})


