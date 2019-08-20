import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import {
  StyledEditor,
  StyledEditorContent,
  StyledEditorCode,
  StyledEditorMenu,
  StyledEditorMenuItem,
  StyledEditorLine,
  StyledEditorHeader,
  StyledEditorButtons,
  StyledEditorButton,
} from './editor.styles';
import Javascript from '../../../static/icons/javascript.svg';
import CSS from '../../../static/icons/css.svg';
import Database from '../../../static/icons/database.svg';

function Editor(props) {
  const [tab, setTab] = useState('index');
  const [lines, _] = useState(props.lines);

  const transitions = useTransition(lines, (lines, index) => index, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    trail: 1000,
  });

  return (
    <StyledEditor {...props}>
      <StyledEditorHeader>
        <StyledEditorButtons>
          <StyledEditorButton color="#faa1bc" />
          <StyledEditorButton color="#ffeaa7" />
          <StyledEditorButton color="#80dad3" />
        </StyledEditorButtons>
      </StyledEditorHeader>
      <StyledEditorContent>
        <StyledEditorMenu>
          <StyledEditorMenuItem onClick={() => setTab('index')}>
            <Javascript width={18} height={18} />
            <span className={tab === 'index' ? 'active' : ''}>index.js</span>
          </StyledEditorMenuItem>
          <StyledEditorMenuItem onClick={() => setTab('styles')}>
            <CSS width={18} height={18} />
            <span className={tab === 'styles' ? 'active' : ''}>styles.css</span>
          </StyledEditorMenuItem>
          <StyledEditorMenuItem onClick={() => setTab('server')}>
            <Database width={18} height={18} />
            <span className={tab === 'server' ? 'active' : ''}>server.js</span>
          </StyledEditorMenuItem>
        </StyledEditorMenu>
        <StyledEditorCode>
          {transitions.map(({ item, props, key }) => (
            <StyledEditorLine key={key} style={props}>
              {item}
            </StyledEditorLine>
          ))}
        </StyledEditorCode>
      </StyledEditorContent>
    </StyledEditor>
  );
}

export default Editor;
