import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
  font-size: 24px;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
`;

const StyledCodeArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledCodeComment = styled.span`
  display: block;
  color: ${props => props.theme.colors.lightBlack};
  font-style: italic;
  margin: 24px 0;
`;

const StyledIf = styled.span`
  color: ${props => props.theme.colors.red};
`;

export { StyledError, StyledCodeArea, StyledCodeComment, StyledIf };
