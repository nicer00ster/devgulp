import { takeEvery, put, call, all, delay } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL, TOKEN_URL, ACF_URL } from '../constants';
import { setToken, verifyToken, arrangeComments } from '../../utils';
import * as types from '../constants';

function apiFetchToken(data) {
  return axios({
    method: 'post',
    url: `${TOKEN_URL}`,
    data: {
      username: data.username,
      password: data.password,
    },
  });
}

function apiLogin(data) {
  return axios({
    method: 'post',
    url: `${TOKEN_URL}`,
    data: {
      username: data.username,
      password: data.password,
    },
  });
}

function apiLogout(token) {
  return axios({
    method: 'post',
    url: `${TOKEN_URL}/revoke`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res);
}

async function apiRegister(data) {
  return axios({
    method: 'post',
    url: `${API_URL}/users/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: data.username,
      password: data.password,
      email: data.email,
    },
  });
}

function apiValidateToken() {
  const token = verifyToken('_app');
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: `${TOKEN_URL}/validate`,
  }).then(token => token);
}

function apiFetchUsers() {
  return axios({
    method: 'get',
    url: `${API_URL}/users`,
  }).then(users => users);
}

function apiFetchUser(userId) {
  return axios({
    method: 'get',
    url: `${API_URL}/users/${userId}`,
  }).then(user => user);
}

function apiFetchPage(slug) {
  return axios({
    method: 'get',
    url: `${API_URL}/pages?slug=${slug}`,
  }).then(page => page);
}

function apiFetchPosts(postCount, page, totalPosts) {
  let offset = postCount * page;
  let perPage = postCount;

  if (offset > totalPosts) {
    perPage = totalPosts - offset;
  }
  return axios({
    method: 'get',
    url: `${API_URL}/posts?_embed&per_page=${perPage}&offset=${offset}`,
  }).then(posts => posts);
}

function apiFetchPostsByCategory(category, postCount, page, totalPosts) {
  let offset = postCount * page;
  let perPage = postCount;

  if (offset > totalPosts) {
    perPage = totalPosts - offset;
  }

  return axios({
    method: 'get',
    url: `${API_URL}/posts?_embed&categories=${category}&per_page=${perPage}&offset=${offset}`,
  }).then(posts => posts);
}

function apiFetchPost(postId) {
  return axios({
    method: 'get',
    url: `${API_URL}/posts/${postId}/?_embed`,
  }).then(post => {
    return {
      data: {
        comments: arrangeComments(post.data.comments),
        ...post.data,
      },
      ...post,
    };
  });
}

function apiFetchPostViews(postId) {
  return axios({
    method: 'get',
    url: `${API_URL}/views/${postId}`,
  }).then(views => views);
}

function apiAddPost(token, title, content, categories, featuredMedia) {
  // Replace all &quot; with an empty string.
  const modifiedContent = content.replace(/&quot;/g, '');
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      title,
      content: modifiedContent,
      categories,
      featured_media: featuredMedia,
      status: 'publish',
    },
    url: `${API_URL}/posts?_embed`,
  });
}

async function apiAddMedia(token, media) {
  const formData = await media;
  let fileName;
  let fileType;
  // Make sure the Form Data being passed from the client is
  // an array and we can loop over the values.
  if (typeof formData.entries === 'function') {
    for (let value of formData.values()) {
      fileName = value.name;
      fileType = value.type;
    }
  } else {
    return types.FILE_TYPE_ERROR;
  }

  if (types.ALLOWED_MIME_TYPES.includes(fileType)) {
    return axios({
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Disposition': `form-data; filename=${fileName}`,
      },
      data: formData,
      url: `${API_URL}/media`,
    })
      .then(media => media)
      .catch(error => ({ error }));
  } else {
    return types.FILE_TYPE_ERROR;
  }
}

async function apiUploadAvatar(token, media) {
  const formData = await media;
  let fileName;
  let fileType;
  // Make sure the Form Data being passed from the client is
  // an array and we can loop over the values.
  if (typeof formData.entries === 'function') {
    for (let value of formData.values()) {
      fileName = value.name;
      fileType = value.type;
    }
  } else {
    return types.FILE_TYPE_ERROR;
  }

  if (types.ALLOWED_MIME_TYPES.includes(fileType)) {
    return axios({
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Disposition': `form-data; filename=${fileName}`,
      },
      data: formData,
      url: `${API_URL}/media`,
    })
      .then(image => {
        return axios({
          method: 'post',
          url: `${ACF_URL}/users/${image.data.author}`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            fields: {
              avatar: image.data.media_details.sizes.full.source_url,
            },
          },
        }).then(user => user);
      })
      .catch(error => ({ error }));
  } else {
    return types.FILE_TYPE_ERROR;
  }
}

function apiFetchCategories() {
  return axios({
    method: 'get',
    url: `${API_URL}/categories`,
  }).then(categories => categories);
}

function apiFetchUserFollowers(userFollowers) {
  const users = userFollowers.toString();
  return axios({
    method: 'get',
    url: `${API_URL}/users?include=${users}`,
  }).then(users => users);
}

function apiFetchUserPosts(userId) {
  return axios({
    method: 'get',
    url: `${API_URL}/posts?author=${userId}&_embed`,
  }).then(post => post);
}

function apiAddComment(data) {
  return axios({
    method: 'post',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: {
      post: data.postId,
      content: data.reply,
    },
    url: `${API_URL}/comments`,
  }).then(reply => reply);
}

function apiAddCommentReply(data) {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    data: {
      post: data.postId,
      content: data.reply,
      parent: data.parent,
    },
    url: `${API_URL}/comments`,
  })
    .then(reply => reply)
    .then(() => apiFetchPost(data.postId))
    .then(res => res);
}

function apiSearch(query) {
  return axios({
    method: 'get',
    url: `${API_URL}/search?search=${query}&_embed`,
  }).then(results => results);
}

function apiUpdatePostLikes(data, userLikes) {
  return axios({
    method: 'post',
    url: `${ACF_URL}/posts/${data.postId}`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: {
      fields: {
        post_likes: userLikes,
      },
    },
  }).then(post => post);
}

function apiUpdateUserInfo(data) {
  return axios({
    method: 'post',
    url: `${API_URL}/users/me`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: {
      description: data.description,
      company_name: data.companyName,
      url: data.url,
    },
  }).then(user => user);
}

function apiFollowUser(data) {
  let followers = [...data.targetUserFollowers];

  if (data.currentUser === data.targetUser) {
    return new Error("You can't follow yourself!");
  }

  if (followers.includes(data.currentUser)) {
    followers = followers.filter(user => user !== data.currentUser);
  } else {
    followers = followers.concat(data.currentUser);
  }

  if (!followers.length) {
    followers = 0;
  }

  return axios({
    method: 'post',
    url: `${ACF_URL}/users/${data.targetUser}`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: {
      fields: {
        user_followers: followers,
      },
    },
  })
    .then(user => user)
    .then(() => apiFetchUserFollowers(followers))
    .then(res => res);
}

// Start sagas.
// -------------------------------
function* loginSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiLogin, data);
    const result = response.data;
    setToken(result.token);

    const userData = yield call(apiFetchUser, result.user_id);

    yield put({
      type: types.LOGIN_SUCCESS,
      result,
      avatar: userData.data.acf.avatar,
      is_online: userData.data.is_online,
    });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

function* logoutSaga(data) {
  yield delay(1000);
  try {
    const response = yield call(apiLogout, data.token);
    yield put({ type: types.LOGOUT_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

function* registerSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiRegister, data);
    const token = yield call(apiFetchToken, data);
    const result = response.data;
    setToken(token.data.token);

    yield put({ type: types.REGISTER_SUCCESS, result });
    yield put({ type: types.VERIFIED_TOKEN_SUCCESS, token });
    yield put({ type: types.CLOSE_MODAL });
  } catch (error) {
    yield put({ type: types.REGISTER_FAILURE, error });
    yield put({ type: types.VERIFIED_TOKEN_FAILURE, error });
  }
}

function* fetchTokenSaga() {
  try {
    const response = yield call(apiFetchToken);
    const res = response.data;

    yield put({ type: types.VERIFIED_TOKEN_SUCCESS, res });
  } catch (error) {
    yield put({ type: types.VERIFIED_TOKEN_FAILURE, error });
  }
}

function* fetchUsersSaga() {
  try {
    const response = yield call(apiFetchUsers);
    yield put({ type: types.FETCH_USERS_SUCCESS, users: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_USERS_FAILURE, error });
  }
}

function* fetchUserSaga() {
  try {
    const token = verifyToken('_app');
    if (token) {
      const validToken = yield call(apiValidateToken);
      const response = yield call(apiFetchUser, validToken.data.data.user_id);
      yield put({
        type: types.FETCH_USER_SUCCESS,
        user: response.data,
        token: token,
      });
    } else {
      yield put({
        type: types.FETCH_USER_FAILURE,
      });
    }
  } catch (error) {
    yield put({ type: types.FETCH_USER_FAILURE, error });
  }
}

function* fetchAuthorSaga(data) {
  try {
    const response = yield call(apiFetchUser, data.userId);
    yield put({ type: types.FETCH_AUTHOR_SUCCESS, user: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_AUTHOR_FAILURE, error });
  }
}

function* fetchPostsSaga(data) {
  yield delay(250);
  try {
    const response = yield call(
      apiFetchPosts,
      data.postCount,
      data.page,
      data.totalPosts,
    );
    yield put({
      type: types.FETCH_POSTS_SUCCESS,
      posts: response.data,
      postCount: data.postCount,
      totalPosts: response.headers['x-wp-total'],
      totalPages: response.headers['x-wp-totalpages'],
    });
  } catch (error) {
    yield put({ type: types.FETCH_POSTS_FAILURE, error });
  }
}

function* fetchPostsByCategorySaga(data) {
  try {
    const response = yield call(
      apiFetchPostsByCategory,
      data.category,
      data.postCount,
      data.page,
      data.totalPosts,
    );
    yield put({
      type: types.FETCH_POSTS_BY_CATEGORY_SUCCESS,
      posts: response.data,
      postCount: data.postCount,
      totalPosts: response.headers['x-wp-total'],
      totalPages: response.headers['x-wp-totalpages'],
    });
  } catch (error) {
    yield put({ type: types.FETCH_POSTS_BY_CATEGORY_FAILURE, error });
  }
}

function* fetchPostSaga(data) {
  try {
    let response = yield call(apiFetchPost, data.postId);
    const author = yield call(apiFetchUser, response.data.author);
    const views = yield call(apiFetchPostViews, data.postId);

    yield put({
      type: types.FETCH_POST_SUCCESS,
      post: response.data,
      author,
      views: views.data,
    });
  } catch (error) {
    yield put({ type: types.FETCH_POST_FAILURE, error });
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield call(apiFetchCategories);
    yield put({
      type: types.FETCH_CATEGORIES_SUCCESS,
      categories: response.data,
    });
  } catch (error) {
    yield put({ type: types.FETCH_CATEGORIES_FAILURE, error });
  }
}

function* fetchUserFollowersSaga(data) {
  try {
    const response = yield call(apiFetchUserFollowers, data.userFollowers);
    yield put({ type: types.FETCH_USER_FOLLOWERS_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.FETCH_USER_FOLLOWERS_FAILURE, error });
  }
}

function* fetchUserPostsSaga(data) {
  try {
    const response = yield call(apiFetchUserPosts, data.userId);
    yield put({ type: types.FETCH_USER_POSTS_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.FETCH_USER_POSTS_FAILURE, error });
  }
}

function* fetchPageSaga(data) {
  try {
    const response = yield call(apiFetchPage, data.slug);
    yield put({ type: types.FETCH_PAGE_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.FETCH_PAGE_FAILURE, error });
  }
}

function* addPostSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(
      apiAddPost,
      data.token,
      data.title,
      data.content,
      data.categories,
      data.featuredMedia,
    );
    yield put({ type: types.ADD_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.ADD_POST_FAILURE, error });
  }
}

function* addMediaSaga(data) {
  const response = yield call(apiAddMedia, data.token, data.media);

  if (response.error) {
    yield put({ type: types.ADD_MEDIA_FAILURE, error: response.error.message });
  } else {
    yield put({ type: types.ADD_MEDIA_SUCCESS, response });
  }
}

function* addCommentSaga(data) {
  try {
    const response = yield call(apiAddComment, data);
    yield put({ type: types.ADD_COMMENT_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.ADD_COMMENT_FAILURE, error });
  }
}

function* addCommentReplySaga(data) {
  try {
    const response = yield call(apiAddCommentReply, data);
    yield put({ type: types.ADD_COMMENT_REPLY_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.ADD_COMMENT_REPLY_FAILURE, error });
  }
}

function* searchSaga(data) {
  yield delay(500);
  try {
    const response = yield call(apiSearch, data.query);
    yield put({ type: types.SEARCH_SUCCESS, response: response.data });
  } catch (error) {
    yield put({ type: types.SEARCH_FAILURE, error });
  }
}

function* updatePostLikesSaga(data) {
  let userLikes = data.postLikes;

  if (userLikes.includes(data.userId)) {
    userLikes = userLikes.filter(id => id !== data.userId);
  } else {
    userLikes.push(data.userId);
  }

  try {
    const response = yield call(apiUpdatePostLikes, data, userLikes);
    yield put({
      type: types.UPDATE_POST_LIKES_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({ type: types.UPDATE_POST_LIKES_FAILURE, error });
  }
}

function* updateUserInfoSaga(data) {
  try {
    const response = yield call(apiUpdateUserInfo, data);
    yield put({ type: types.UPDATE_USER_INFO_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_INFO_FAILURE });
  }
}

function* uploadAvatarSaga(data) {
  const response = yield call(apiUploadAvatar, data.token, data.media);

  if (response.error) {
    yield put({
      type: types.UPLOAD_AVATAR_FAILURE,
      error: response.error.message,
    });
  } else {
    yield put({ type: types.UPLOAD_AVATAR_SUCCESS, response });
  }
}

function* followUserSaga(data) {
  try {
    const response = yield call(apiFollowUser, data);
    yield put({ type: types.FOLLOW_OR_UNFOLLOW_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.FOLLOW_OR_UNFOLLOW_USER_FAILURE, error });
  }
}

function* rootSaga() {
  yield all([
    takeEvery(types.VERIFIED_TOKEN, fetchTokenSaga),
    takeEvery(types.REGISTER, registerSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
    takeEvery(types.SEARCH, searchSaga),
    takeEvery(types.ADD_POST, addPostSaga),
    takeEvery(types.ADD_MEDIA, addMediaSaga),
    takeEvery(types.ADD_COMMENT, addCommentSaga),
    takeEvery(types.ADD_COMMENT_REPLY, addCommentReplySaga),
    takeEvery(types.UPDATE_POST_LIKES, updatePostLikesSaga),
    takeEvery(types.UPDATE_USER_INFO, updateUserInfoSaga),
    takeEvery(types.UPLOAD_AVATAR, uploadAvatarSaga),
    takeEvery(types.FOLLOW_OR_UNFOLLOW_USER, followUserSaga),
    takeEvery(types.FETCH_USER, fetchUserSaga),
    takeEvery(types.FETCH_USERS, fetchUsersSaga),
    takeEvery(types.FETCH_POSTS, fetchPostsSaga),
    takeEvery(types.FETCH_POSTS_BY_CATEGORY, fetchPostsByCategorySaga),
    takeEvery(types.FETCH_POST, fetchPostSaga),
    takeEvery(types.FETCH_CATEGORIES, fetchCategoriesSaga),
    takeEvery(types.FETCH_AUTHOR, fetchAuthorSaga),
    takeEvery(types.FETCH_USER_FOLLOWERS, fetchUserFollowersSaga),
    takeEvery(types.FETCH_USER_POSTS, fetchUserPostsSaga),
    takeEvery(types.FETCH_PAGE, fetchPageSaga),
  ]);
}

export default rootSaga;
