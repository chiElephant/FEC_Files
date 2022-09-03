import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import Overview from '../components/Overview.jsx';
import React from 'react';
import ProductInfo from '../components/ProductInfo.jsx';
import App from '../components/App.jsx';
import Styles from '../components/Styles.jsx';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// it('Overview Component renders correctly', () => {
//   const tree = renderer.create(<Overview />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

const product = {
  "id": 71697,
  "campus": "hr-rpp",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2022-05-11T19:38:15.373Z",
  "updated_at": "2022-05-11T19:38:15.373Z",
  'features': [
    {feature: 'Fabric', value: 'Canvas'},
    {feature: 'Buttons', value: 'Brass'}
  ]
};

const styles = {
  "product_id": "71697",
  "results": [
    {
      default: true,
      name: "Forest Green & Black",
      original_price: "140.00",
      photos: [{
        thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      }],
      sale_price: null,
      skus: {2580526: {
        quantity: 8,
        size: "XS"
      }},
      style_id: 444218
    }
  ]
};

const features = [
  {feature: 'Fabric', value: 'Canvas'},
  {feature: 'Buttons', value: 'Brass'}
]

describe('Atelier topbar', () => {
    test('The Atelier Topbar renders correctly', () => {
      render (<App />);
      const element = screen.getByRole('heading', {
        name: /The RedBean Atelier App/i
      });
      expect(element).toBeInTheDocument();
  });
})

describe('Overview Component', () => {
  describe('ProductInfo Component', () => {
    test('Renders the add to my outfit button', () => {
      render(<ProductInfo product={product} features={product.features}/>);
      const element = screen.getByRole('button', {
        name: /Add to My Outfit/i
      });
      expect(element).toBeInTheDocument();
    })
  });

  describe('Styles Component', () => {
    test('Renders the style selector div', () => {
      render(<Styles product={product} styles={styles.results}/>);
      const element = screen.getByTestId('style-selector');
      expect(element).toBeInTheDocument();
    })
  })
})
