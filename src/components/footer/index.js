import { connect } from 'react-redux';
import Link from 'next/link';
import {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem,
} from './footer.styles';

function Footer(props) {
  return (
    <StyledFooterOuter
      drawerOpen={props.drawerOpen}
      loginMenuOpen={props.loginMenuOpen}
      userMenuOpen={props.userMenuOpen}>
      <StyledFooterInner>
        <StyledFooter>
          <StyledFooterList>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
          </StyledFooterList>
        </StyledFooter>
      </StyledFooterInner>
    </StyledFooterOuter>
  );
}

const mapStateToProps = ({ root }) => ({
  drawerOpen: root.drawerOpen,
  loginMenuOpen: root.loginMenuOpen,
  userMenuOpen: root.userMenuOpen,
});

export default connect(
  mapStateToProps,
  null,
)(Footer);
