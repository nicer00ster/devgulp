import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledEditor = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.shadow};
  background: ${props => props.theme.colors.white};
  max-width: 50%;
  margin: 0 auto;
  transition: all 0.25s ease !important;
  ${props => props.theme.mediaQuery.tablet`
    min-width: auto;
    max-width: 75%;
  `};
  ${props => props.theme.mediaQuery.phone`
    min-width: auto;
    max-width: 100%;
  `};
  &:hover,
  &:active {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
`;

const StyledEditorContent = styled.div`
  display: flex;
`;

const StyledEditorCode = styled.pre`
  color: ${props => props.theme.colors.lightBlack};
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 24px;
  white-space: pre;
  text-align: left;
  margin: 0 auto;
  counter-reset: line;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 0.6rem;
  ${props => props.theme.mediaQuery.phone`
        font-size: 10px;
        letter-spacing: 0;
        padding: .8rem .4rem;
    `};
`;

const StyledEditorMenu = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding-left: 1.6rem;
  padding-top: 1.6rem;
  margin: 0;
  ${props => props.theme.mediaQuery.phone`
        font-size: 12px;
        padding-left: .8rem;
        padding-top: .8rem;
    `};
`;

const StyledEditorMenuItem = styled.li`
  font-size: 10px;
  font-weight: bolder;
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 6px;
  letter-spacing: 2px;
  & span {
    padding-left: 4px;
    transition: text-shadow 0.25s ease-in;
    &.active {
      text-shadow: 0 1px 1px ${props => props.theme.colors.black};
    }
  }
`;

const StyledEditorLine = styled(animated.span)`
  display: flex;
  white-space: pre-wrap;
  &:before {
    counter-increment: line;
    content: counter(line);
    display: inline-block;
    margin-right: 12px;
    color: ${props => props.theme.colors.grey};
    text-align: right;
    width: 18px;
  }
  ${props => props.theme.mediaQuery.phone`
    &:before {
        margin-right: 8px;
        width: 12px;
    }
  `};
`;

const StyledEditorHeader = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  margin: 0px auto -2px;
`;

const StyledEditorButtons = styled.div`
  display: inline-block;
  padding: 1.4rem;
  overflow-y: hidden;
  ${props => props.theme.mediaQuery.phone`
        padding-left: 1rem;
    `};
`;

const StyledEditorButton = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export {
  StyledEditor,
  StyledEditorContent,
  StyledEditorCode,
  StyledEditorMenu,
  StyledEditorMenuItem,
  StyledEditorLine,
  StyledEditorHeader,
  StyledEditorButtons,
  StyledEditorButton,
};
