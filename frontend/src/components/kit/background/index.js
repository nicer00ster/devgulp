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
    transform: `translate3d(-${scrollY / 4}px, 80px, 0px)`,
  });

  return (
    <StyledBackground
      drawerOpen={props.drawerOpen}
      loginMenuOpen={props.loginMenuOpen}
      userMenuOpen={props.userMenuOpen}>
      <StyledBackgroundDevices style={spring}>
        <StyledBackgroundTablet offset={125}>
          <img src="/static/devgulp-editor.svg" alt="Slider Image 1" />
        </StyledBackgroundTablet>
        <StyledBackgroundBigPhone offset={0}>
          <img src="/static/phone-big-wireframe.png" alt="Slider Image 2" />
        </StyledBackgroundBigPhone>
        <StyledBackgroundBigTablet offset={100}>
          <img src="/static/devgulp-big-tablet.svg" alt="Slider Image 3" />
        </StyledBackgroundBigTablet>
        <StyledBackgroundPhone offset={0}>
          <img src="/static/devgulp-cards.svg" alt="Slider Image 4" />
        </StyledBackgroundPhone>
        <StyledBackgroundTablet offset={0}>
          <img
            src="https://stripe.com/img/v3/home/app-illustrations/salesforce.svg"
            alt="Slider Image 5"
          />
        </StyledBackgroundTablet>
        <StyledBackgroundTablet offset={125}>
          <img src="/static/devgulp-editor.svg" alt="Slider Image 1" />
        </StyledBackgroundTablet>
      </StyledBackgroundDevices>
    </StyledBackground>
  );
}

export default Background;
