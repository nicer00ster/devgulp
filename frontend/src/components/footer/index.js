import { connect } from 'react-redux';
import Link from 'next/link';
import {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem,
  StyledFooterLogo,
  StyledLogo,
} from './footer.styles';

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
                <a className="disabled">Terms</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/policy">
                <a>Privacy</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a className="disabled">Status</a>
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
              <StyledLogo href="#">
                <img src="/static/devgulp-logo.svg" alt="DevGulp" />
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
  null,
)(Footer);
