import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const circle = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const check = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledForm = styled.form`
  position: relative;
  width: 50%;
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
  line-height: 1.5;
  box-shadow: ${props => props.theme.effects.shadow};
  transition: all 0.25s ease !important;
  overflow: ${props => (props.formStatus !== '' ? 'unset' : 'hidden')};
  opacity: 1;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    padding: 4rem;
    position: absolute;
  }
  &:hover {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
  fieldset {
    position: relative;
    border: 0;
    padding: 1.6rem;
    transform: ${props =>
      props.formStatus === 'success' ? 'translateY(500px)' : 'translateY(0px)'};
    opacity: ${props => (props.formStatus === 'success' ? '0' : '1')};
    transition: all 0.5s 0.35s cubic-bezier(0.55, 0, 0.1, 1) !important;
    &[disabled] {
      opacity: 0.5;
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
    &::before {
      content: '';
      display: block;
      height: 2px;
      background-image: linear-gradient(
        to right,
        ${props => props.theme.colors.black} 0%,
        ${props => props.theme.colors.black} 50%,
        ${props => props.theme.colors.black} 100%
      );
    }
  }
  ${props => props.theme.mediaQuery.tablet`
    width: 100%;
  `}
`;

const StyledFormHeading = styled.h2`
  text-align: left;
  padding: 1.2rem;
  margin: 0;
  background-color: rgba(31, 34, 46, 0.75);
  color: ${props => props.theme.colors.white};
  font-family: 'Trirong', serif;
  letter-spacing: 2px;
`;

const StyledCheckmark = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 9999;
  & svg {
    color: #87dfd6;
    width: 100%;
    height: 100%;
    &.animate {
      .circle {
        stroke-dasharray: 531.2621459960938;
        stroke-dashoffset: -531.2621459960938;
        animation: ${circle} 2.5s cubic-bezier(0.12, -0.01, 0.81, 1.42) forwards;
      }
      .check {
        stroke-dasharray: 18.391849517822266;
        stroke-dashoffset: -18.391849517822266;
        animation: ${check} 0.4s cubic-bezier(0.55, 0.09, 0.59, 0.96) 2s
          forwards;
      }
    }
  }
`;

export { StyledForm, StyledFormHeading, StyledCheckmark };
