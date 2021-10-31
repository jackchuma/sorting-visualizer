import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('App renders without crashing', () => {
  const app = renderer.create(<App />);
  let tree = app.toJSON();
  expect(tree).toMatchSnapshot();
})
