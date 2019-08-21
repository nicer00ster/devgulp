import { connect } from 'react-redux';
import { toggleDrawer, closeDrawer } from '../../../redux/actions';
import { StyledBurger } from './burger.styles';

function Burger(props) {
  return (
    <StyledBurger
      onClick={e => {
        e.preventDefault();
      }}
      onMouseDown={props.toggleDrawer}
      drawerOpen={props.drawerOpen}
      href="#"
      aria-label="Menu"
      className={`menu ${props.drawerOpen ? '-toggle' : ''}`}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}

const mapStateToProps = ({ root }) => ({
  drawerOpen: root.drawerOpen,
});

const mapDispatchToProps = {
  toggleDrawer,
  closeDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Burger);
