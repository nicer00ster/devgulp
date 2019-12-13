import styled, { createGlobalStyle, css } from 'styled-components';

const LayoutStyles = styled.main`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.breakpoints.desktop}px;
  margin: 0 auto;
  position: relative;
  transition: all 0.25s linear;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: ${props =>
    props.userMenuOpen || props.loginMenuOpen ? '-1' : 'unset'};
  ${props => props.theme.mediaQuery.tablet`
    max-width: ${props => props.theme.breakpoints.tablet}px;
  `}
  ${props => props.theme.mediaQuery.phone`
    max-width: ${props => props.theme.breakpoints.phone}px;
  `}
`;

const breakpoints = {
  desktop: 1080,
  tablet: 768,
  phone: 576,
};

const colors = {
  black: '#1f222e',
  grey: '#d9d9d9',
  white: '#fefefe',
  offWhite: '#fffaf1',
  yellow: '#ffeaa7',
  blue: '#92c5f8',
  red: '#faa1bc',
  green: '#80dad3',
  lightWhite: 'rgba(254,254,254,0.75)',
  lightBlack: 'rgba(31, 34, 46, 0.75)',
  lightGrey: 'rgba(27,31,35,.05)',
  lightBlue: 'rgba(155,207,255,0.66)',
  lightGreen: 'rgba(12,242,143,.2)',
  successBackground: 'rgb(227, 252, 239)',
  successDuration: 'rgb(54, 179, 126)',
  warningBackground: 'rgb(255, 250, 230)',
  warningDuration: 'rgb(255, 171, 0)',
  errorBackground: 'rgb(255, 235, 230)',
  errorDuration: 'rgb(191, 38, 0)',
};

const effects = {
  hover: 'rgba(31, 34, 46, 0.25)',
  shadow: '0px 4px 16px 0px rgba(46, 61, 73, 0.2)',
  shadowHover: '2px 4px 8px 0px rgba(46, 61, 73, 0.2)',
  radius: '0.275rem',
};

const mediaQuery = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const GlobalStyles = createGlobalStyle`
     @font-face {
       font-family: 'Blinker';
       font-display: auto;
       src: local('Blinker'), url('/static/fonts/Blinker.ttf') format('truetype');
     }
     @font-face {
       font-family: 'Trirong';
       font-display: auto;
       src: local('Trirong'), url('/static/fonts/Trirong.ttf') format('truetype');
     }
    html {
      box-sizing: border-box;
      font-size: 12px;
      position: relative;
      min-height: 100%;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      background-color: ${colors.white};
      font-family: 'Blinker', -apple-system, BlinkMacSystemFont,'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      font-size: 1rem;
      padding: 0;
      margin: 0;
      overflow: ${props => (props.menuOpen ? 'hidden' : 'auto')};
    }
    a {
      text-decoration: none;
      color: ${colors.lightBlack};
      transition: color 0.15s ease-in;
      cursor: pointer;
      &:hover, &:focus {
        color: ${colors.black};
      }
    }
    pre {
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
        serif;
        line-height: 17px;
        margin: 0;
        white-space: pre;
        color: ${colors.white};
    }
    .bold {
        font-weight: 600;
    }
    .emoji-mart {
      width: 100% !important;
    }
    ::selection {
      color: ${colors.white};
      background: ${colors.lightBlack};
    }
    textarea::-webkit-scrollbar {
      width: 3px;
    }
    textarea::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
    textarea::-webkit-scrollbar-thumb {
      background: ${colors.lightBlack}; 
      border-radius: 12px;
      transition: all 0.25s ease-in;
      cursor: pointer;
    }
    textarea::-webkit-scrollbar-thumb:hover {
      background: ${colors.black}; 
    }
    [data-tooltip="true"] {
      position: relative;
      &:hover {
        > div {
          opacity: 1;
          visibility: visible;
        }
      }
    }
`;

export { LayoutStyles, GlobalStyles, breakpoints, colors, effects, mediaQuery };
