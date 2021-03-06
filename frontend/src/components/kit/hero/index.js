import { connect } from 'react-redux';
import { StyledHero, StyledHeroOverlay } from './hero.styles';

function Hero(props) {
  return (
    <StyledHero
      drawerOpen={props.drawerOpen}
      userMenuOpen={props.userMenuOpen}
      loginMenuOpen={props.loginMenuOpen}>
      <StyledHeroOverlay />
      {props.children}
    </StyledHero>
  );
}

const mapStateToProps = ({ root }) => ({
  userMenuOpen: root.userMenuOpen,
  loginMenuOpen: root.loginMenuOpen,
  drawerOpen: root.drawerOpen,
});

export default connect(
  mapStateToProps,
  null,
)(Hero);
