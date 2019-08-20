import { useState, useEffect } from 'react';
import {
  StyledButton,
  StyledRipple,
  StyledRippleCircle,
} from './button.styles';

function Button(props) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({});
  useEffect(() => {
    setTimeout(() => {
      isActive && setIsActive(false);
    }, 500);
  }, [isActive]);

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    setPosition({ left, top });
    setIsActive(true);
  }
  return (
    <StyledButton onClick={e => handleClick(e)}>
      <StyledRipple className={isActive ? 'active' : ''}>
        <StyledRippleCircle
          style={{ left: position.left, top: position.top }}
        />
      </StyledRipple>
      {props.children}
    </StyledButton>
  );
}

export default Button;
