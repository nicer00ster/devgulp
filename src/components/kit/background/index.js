import { useState, useEffect } from 'react';
import { useSpring } from 'react-spring';
import {
  StyledBackground,
  StyledBackgroundDevices,
  StyledBackgroundTablet,
  StyledBackgroundPhone,
  StyledBackgroundBigPhone,
  StyledBackgroundBigTablet,
} from './background.styles';

function Background(props) {
  const [scrollY, setScrollY] = useState(0);

  function handleWindowScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [window.scrollY]);

  const spring = useSpring({
    transform: `translate3d(-${scrollY}px, 80px, 0px)`,
  });

  return (
    <StyledBackground userMenuOpen={props.userMenuOpen}>
      <StyledBackgroundDevices style={spring}>
        <StyledBackgroundTablet offset={125}>
          <img src="/static/devgulp-editor.svg" />
        </StyledBackgroundTablet>
        <StyledBackgroundBigPhone offset={0}>
          <img src="/static/phone-big-wireframe.png" />
        </StyledBackgroundBigPhone>
        <StyledBackgroundBigTablet offset={100}>
          <img src="/static/devgulp-big-tablet.svg" />
        </StyledBackgroundBigTablet>
        <StyledBackgroundPhone offset={0}>
          <img src="/static/devgulp-cards.svg" />
        </StyledBackgroundPhone>
        <StyledBackgroundTablet offset={0}>
          <img src="https://stripe.com/img/v3/home/app-illustrations/salesforce.svg" />
        </StyledBackgroundTablet>
        <StyledBackgroundTablet>
          <img src="https://stripe.com/img/v3/home/app-illustrations/salesforce.svg" />
        </StyledBackgroundTablet>
      </StyledBackgroundDevices>
    </StyledBackground>
  );
}

export default Background;
