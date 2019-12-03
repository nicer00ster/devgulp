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
import { Links } from '../../utils/enumerations/Links';

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
              <Link href={Links.HOME}>
                <a>Terms</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href={Links.POLICY}>
                <a>Privacy</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href={Links.HOME}>
                <a>Status</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href={Links.HELP}>
                <a>Help</a>
              </Link>
            </StyledFooterListItem>
          </StyledFooterList>
          <StyledFooterLogo>
            <Link href={Links.HOME} prefetch scroll={false}>
              <StyledLogo href="#">
                <img src="/static/devgulp-logo.svg" alt="DevGulp" />
              </StyledLogo>
            </Link>
          </StyledFooterLogo>
          <StyledFooterList align="flex-end">
            <StyledFooterListItem>
              <Link href={Links.PUBLISH}>
                <a>Publish</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href={Links.USERS}>
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

export default connect(mapStateToProps)(Footer);
