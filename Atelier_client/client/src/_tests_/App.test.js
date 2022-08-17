import renderer from 'react-test-renderer';
import App from '../components/App.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});