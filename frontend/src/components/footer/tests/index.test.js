import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Footer from '../index';
import { initializeStore } from '../../../redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  breakpoints,
  colors,
  effects,
  mediaQuery,
} from '../../layout/layout.styles';

describe('<Footer />', () => {
  let testStore;
  const theme = {
    breakpoints,
    mediaQuery,
    colors,
    effects,
  };

  beforeAll(() => {
    testStore = initializeStore();
  });

  it('should render props passed to it', () => {
    const { container } = render(
      <Provider store={testStore}>
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
