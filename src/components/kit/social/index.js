import { useRef } from 'react';
import { useTransition, useChain, config } from 'react-spring';
import {
  StyledSocial,
  StyledSocialButton,
  StyledSocialIcon,
} from './social.styles';

function SocialButton(props) {
  function handleFacebookDialog(url) {
    return FB.ui({
      method: 'share',
      href: url,
    });
  }

  function handleLinkedInDialog(url) {
    window.open(
      url,
      '',
      'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
    );
    return false;
  }

  return (
    <StyledSocialButton
      className="twitter-share-button"
      target="_blank"
      onClick={() => {
        if (props.name === 'fab fa-facebook-f') {
          handleFacebookDialog(props.url);
        }
        if (props.name === 'fab fa-linkedin-in') {
          handleLinkedInDialog(props.url);
        }
      }}
      href={props.url}
      style={{ ...props.style }}>
      <StyledSocialIcon className={props.name} color={props.color} />
    </StyledSocialButton>
  );
}

function SocialSharing(props) {
  const data = [
    {
      key: 1,
      name: 'fab fa-facebook-f',
      url: 'https://alexbusch.io',
      yPixels: 25,
      xPixels: 35,
      color: '#3c5a99',
    },
    {
      key: 2,
      name: 'fab fa-twitter',
      url: `https://twitter.com/intent/tweet?text=Check out the article ${props.postName} on DevGulp!&via=DevGulp&url=${window.location.href}`,
      yPixels: 50,
      xPixels: 0,
      color: '#1da1f2',
    },
    {
      key: 3,
      name: 'fab fa-linkedin-in',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=LinkedIn&source=LinkedIn`,
      yPixels: 25,
      xPixels: -35,
      color: '#0077b5;',
    },
  ];

  const transRef = useRef();
  const transitions = useTransition(props.open ? data : [], item => item.name, {
    ref: transRef,
    config: config.wobbly,
    unique: true,
    trail: 600 / data.length,
    from: item => ({
      opacity: 0,
      transform: `translate3d(${item.xPixels}px, 0px, 0px) scale(0)`,
    }),
    enter: item => ({
      opacity: 1,
      transform: `translate3d(0px, -${item.yPixels}px, 0px) scale(1)`,
    }),
    leave: item => ({
      opacity: 0,
      transform: `translate3d(${item.xPixels}px, 0px, 0px) scale(0)`,
    }),
  });

  useChain([transRef, transRef], [0, props.open ? 0.1 : 0.6]);

  return (
    <StyledSocial type={props.type}>
      {transitions.map(({ item, key, props }) => (
        <SocialButton
          key={key}
          name={item.name}
          url={item.url}
          color={item.color}
          style={{ ...props }}
        />
      ))}
    </StyledSocial>
  );
}

export default SocialSharing;
