/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

import Search from '../pages/search.js';

describe('Search Page', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <Search />
        </Provider>,
      ),
    );
  });
});
