import { useState } from 'react';
import { StyledShareButton } from './shareButton.styles';
import SocialSharing from '../social';

function ShareButton(props) {
  const [open, set] = useState(false);

  return (
    <StyledShareButton className={open && 'active'} onClick={() => set(!open)}>
      <SocialSharing open={open} type="sidebar" postName={props.postName} />
      <i className="fal fa-share-alt" />
    </StyledShareButton>
  );
}

export default ShareButton;
