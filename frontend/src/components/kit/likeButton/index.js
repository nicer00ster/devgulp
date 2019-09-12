import { useState, useEffect } from 'react';
import {
  StyledLikeButton,
  StyledLikeIcon,
  StyledLikeConfetti,
} from './likeButton.styles';

function LikeButton(props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.isLiked) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props.isLiked]);

  function handleClick() {
    setActive(!active);
    props.onClick();
  }

  return (
    <StyledLikeButton
      disabled={!props.token}
      onClick={handleClick}
      className={active && 'active'}>
      <StyledLikeIcon className={`${!active ? 'far' : 'fas'} fa-heart`} />
      <StyledLikeConfetti color="palegreen" />
      <StyledLikeConfetti color="tomato" />
      <StyledLikeConfetti color="blue" />
      <StyledLikeConfetti color="yellow" />
      <StyledLikeConfetti color="pink" />
      <StyledLikeConfetti color="purple" />
      <StyledLikeConfetti color="orange" />
      <StyledLikeConfetti color="green" />
    </StyledLikeButton>
  );
}

export default LikeButton;
