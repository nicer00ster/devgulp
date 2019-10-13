import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Footer from '../index';

describe('<Footer />', () => {
    it('should render props passed to it', () => {

        const { container } = render(<Footer />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
