import * as types from '../constants';
import { deleteToken } from '../../utils';

// Global Actions
export function screenResize(width) {
  return {
    type: types.SCREEN_RESIZE,
    width,
  };
}

export function handleInput(input, el) {
  return {
    type: types.INPUT,
    input,
    el,
  };
}

export function toggleLoginMenu() {
  return {
    type: types.TOGGLE_LOGIN_MENU,
  };
}

export function toggleUserMenu() {
  return {
    type: types.TOGGLE_USER_MENU,
  };
}

export function toggleModal() {
  return {
    type: types.TOGGLE_MODAL,
  };
}

export function openLoginMenu() {
  return {
    type: types.OPEN_LOGIN_MENU,
  };
}

export function toggleSearch() {
  return {
    type: types.TOGGLE_SEARCH,
  };
}

export function toggleDrawer() {
  return {
    type: types.TOGGLE_DRAWER,
  };
}

export function toggleDonationMenu() {
  return {
    type: types.TOGGLE_DONATION_MENU,
  };
}

export function closeDonationMenu() {
  return {
    type: types.CLOSE_DONATION_MENU,
  };
}

export function closeDrawer() {
  return {
    type: types.CLOSE_DRAWER,
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL,
  };
}

export function filterTaxonomy(taxonomy) {
  return {
    type: types.FILTER_TAXONOMY,
    taxonomy,
  };
}

export function updatePostLikes(token, postLikes, postId, userId) {
  return {
    type: types.UPDATE_POST_LIKES,
    token,
    postLikes,
    postId,
    userId,
  };
}

export function updateUserInfo(token, description, companyName) {
  return {
    type: types.UPDATE_USER_INFO,
    token,
    description,
    companyName,
  };
}

export function login(username, password) {
  return {
    type: types.LOGIN,
    username,
    password,
  };
}

export function register(username, email, password, verifyPassword) {
  return {
    type: types.REGISTER,
    username,
    email,
    password,
    verifyPassword,
  };
}

export function addPost(token, title, content, categories, featuredMedia) {
  return {
    type: types.ADD_POST,
    token,
    title,
    content,
    categories,
    featuredMedia,
  };
}

export function addComment(token, postId, reply) {
  return {
    type: types.ADD_COMMENT,
    token,
    postId,
    reply,
  };
}

export function addCommentReply(token, postId, reply, parent) {
  return {
    type: types.ADD_COMMENT_REPLY,
    token,
    postId,
    reply,
    parent,
  };
}

export function addMedia(token, media) {
  return {
    type: types.ADD_MEDIA,
    token,
    media,
  };
}

export function uploadAvatar(token, media) {
  return {
    type: types.UPLOAD_AVATAR,
    token,
    media,
  };
}

export function followUnfollowUser(
  token,
  currentUser,
  targetUser,
  targetUserFollowers,
) {
  return {
    type: types.FOLLOW_OR_UNFOLLOW_USER,
    token,
    currentUser,
    targetUser,
    targetUserFollowers,
  };
}

export function searchQuery(query) {
  return {
    type: types.SEARCH,
    query,
  };
}

export function logout() {
  deleteToken();
  return {
    type: types.LOGOUT,
  };
}

export function fetchUser(user) {
  return {
    type: types.FETCH_USER,
    user,
  };
}

export function fetchAuthor(userId) {
  return {
    type: types.FETCH_AUTHOR,
    userId,
  };
}

export function fetchUsers() {
  return {
    type: types.FETCH_USERS,
  };
}

export function fetchPosts(postCount) {
  return {
    type: types.FETCH_POSTS,
    postCount,
  };
}

export function fetchTotalPosts() {
  return {
    type: types.FETCH_TOTAL_POSTS,
  };
}

export function fetchPost(postId) {
  return {
    type: types.FETCH_POST,
    postId,
  };
}

export function fetchCategories() {
  return {
    type: types.FETCH_CATEGORIES,
  };
}

export function fetchUserFollowers(userFollowers) {
  return {
    type: types.FETCH_USER_FOLLOWERS,
    userFollowers,
  };
}

export function fetchUserPosts(userId) {
  return {
    type: types.FETCH_USER_POSTS,
    userId,
  };
}

export function fetchPage(slug) {
  return {
    type: types.FETCH_PAGE,
    slug,
  };
}
