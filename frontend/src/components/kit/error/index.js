import React, { useEffect } from 'react';
import {
  StyledError,
  StyledCodeArea,
  StyledCodeComment,
  StyledIf,
} from './error.styles';
import Container from '../container';

function EnhancedError(props) {
  return (
    <Container>
      <StyledError>
        <StyledCodeArea>
          <StyledCodeComment>// 404 page not found.</StyledCodeComment>
          <span style={{ display: 'inline-block' }}>
            <StyledIf>if </StyledIf>(<span style={{ color: '#4ca8ef' }}>!</span>
            <span style={{ fontStyle: 'italic', color: '#bdbdbd' }}>found</span>){' '}
            {'{'}
          </span>
          <span
            style={{
              display: 'flex',
              paddingLeft: '42px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <span style={{ color: '#2796ec' }}>
              <i>throw</i>
            </span>
            (<span style={{ color: '#a6a61f' }}>"(╯°□°)╯︵ ┻━┻"</span>);
          </span>
          {'}'}
        </StyledCodeArea>
      </StyledError>
    </Container>
  );
}

export default EnhancedError;
