import { connect } from 'react-redux';
import Link from 'next/link';
import {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem,
  StyledFooterLogo,
} from './footer.styles';
import { StyledLogo } from '../header/header.styles';

function Footer(props) {
  return (
    <StyledFooterOuter
      drawerOpen={props.drawerOpen}
      loginMenuOpen={props.loginMenuOpen}
      userMenuOpen={props.userMenuOpen}>
      <StyledFooterInner>
        <StyledFooter>
          <StyledFooterList align="flex-start">
            <StyledFooterListItem>
              @ {new Date().getFullYear()} DevGulp, Inc.
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Terms</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/policy">
                <a>Privacy</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Status</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/help">
                <a>Help</a>
              </Link>
            </StyledFooterListItem>
          </StyledFooterList>
          <StyledFooterLogo>
            <Link href="/" prefetch scroll={false}>
              <StyledLogo href="#" style={{ width: '100%', textAlign: 'center' }}>
                DevGulp
              </StyledLogo>
            </Link>
          </StyledFooterLogo>
          <StyledFooterList align="flex-end">
            <StyledFooterListItem>
              <Link href="/publish">
                <a>Publish</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/users">
                <a>Users</a>
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
)(Footer);
