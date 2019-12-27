import { connect } from 'react-redux';
import { StyledContainer, StyledContainerWrapper } from './container.styles';
import Loading from '../loading';

function Container(props) {
  return (
    <StyledContainerWrapper
      isSearching={props.isSearching}
      isFetchingPosts={props.isFetchingPosts}
      userMenuOpen={props.userMenuOpen}
      drawerOpen={props.drawerOpen}
      loginMenuOpen={props.loginMenuOpen}>
      <StyledContainer
        className={props.className}
        isUpdatingUser={props.isUpdatingUser}
        isSearching={props.isSearching}
        isFetchingPosts={props.isFetchingPosts}
        userMenuOpen={props.userMenuOpen}
        drawerOpen={props.drawerOpen}
        loginMenuOpen={props.loginMenuOpen}>
        {props.children}
        {props.isUpdatingUser && <Loading />}
      </StyledContainer>
    </StyledContainerWrapper>
  );
}

const mapStateToProps = ({ root, posts, search, author }) => ({
  loginMenuOpen: root.loginMenuOpen,
  userMenuOpen: root.userMenuOpen,
  drawerOpen: root.drawerOpen,
  isFetchingPosts: posts.isFetchingPosts,
  isSearching: search.isSearching,
  isUpdatingUser: author.isUpdatingUser,
});

export default connect(
  mapStateToProps,
  null,
)(Container);
