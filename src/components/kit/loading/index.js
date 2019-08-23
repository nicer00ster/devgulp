import styled, {keyframes} from 'styled-components';

const loading = keyframes`
    to {
      transform: rotate(360deg);
    }
`;

const Spinner = styled.span`
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 1px solid #ccc;
    border-top-color: #1f222e;
    animation: ${loading} 0.6s linear infinite;
  }
`;

const Loading = () => <Spinner/>;

export default Loading;
