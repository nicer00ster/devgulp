import { useState } from "react";
import {
  StyledLikeButton,
  StyledLikeIcon,
  StyledLikeConfetti
} from "./likeButton.styles";

function LikeButton() {
  const [active, setActive] = useState(false);
  return (
    <StyledLikeButton
      onClick={() => setActive(!active)}
      className={active && "active"}
    >
      <StyledLikeIcon
        className={`${!active ? "far" : "fas"} fa-heart`}
      ></StyledLikeIcon>
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
