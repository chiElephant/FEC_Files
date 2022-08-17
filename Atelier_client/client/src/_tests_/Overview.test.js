import renderer from 'react-test-renderer';
import Overview from '../components/Overview.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Overview />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});