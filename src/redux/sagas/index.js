import {
  apply,
  takeEvery,
  takeLatest,
  throttle,
  put,
  call,
  take,
  all,
  fork,
  delay
} from "redux-saga/effects";
import axios from "axios";
import { API_URL, TOKEN_URL } from "../constants";
import { setToken, verifyToken } from "../../utils";

import * as types from "../constants";

function apiFetchToken(data) {
  return axios({
    method: "post",
    url: TOKEN_URL,
    data: {
      username: data.username,
      password: data.password
    }
  });
}

function apiLogin(data) {
  return axios({
    method: "post",
    url: TOKEN_URL,
    data: {
      username: data.username,
      password: data.password
    }
  });
}

async function apiRegister(data) {
  return axios({
    method: "post",
    url: `${API_URL}/users/register`,
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      username: data.username,
      password: data.password,
      email: data.email
    }
  });
}

function apiValidateToken() {
  const token = verifyToken("_app");
  return axios({
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `${TOKEN_URL}/validate`
  });
}

function apiFetchUsers() {
  return axios({
    method: "get",
    url: `${API_URL}/users`
  }).then(users => users);
}

function apiFetchUser(userId, token) {
  return axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `${API_URL}/users/${userId}`
  }).then(user => user);
}

function apiFetchPosts() {
  return axios({
    method: "get",
    url: `${API_URL}/posts?_embed`
  }).then(posts => posts);
}

function apiFetchPost(postId) {
  return axios({
    method: "get",
    url: `${API_URL}/posts/${postId}/?_embed`
  }).then(post => post);
}

function apiAddPost(token, title, content, categories, featuredMedia) {
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {
      title,
      content,
      categories,
      featured_media: featuredMedia,
      status: "publish"
    },
    url: `${API_URL}/posts?_embed`
  });
}

async function apiAddMedia(token, media) {
  const formData = await media;

  return axios({
    method: "post",
    headers: {
      "Content-Disposition": `form-data; filename=user_upload.png`,
      Authorization: `Bearer ${token}`
    },
    data: formData,
    url: `${API_URL}/media`
  });
}

function apiFetchCategories() {
  return axios({
    method: "get",
    url: `${API_URL}/categories`
  }).then(categories => categories);
}

function* loginSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiLogin, data);
    const result = response.data;
    setToken(result.token);

    const userData = yield call(apiFetchUser, result.user_id, result.token);

    yield put({
      type: types.LOGIN_SUCCESS,
      result,
      avatar: userData.data.acf.avatar
    });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

function* logoutSaga() {
  yield delay(1500);
  try {
    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE });
  }
}

function* registerSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiRegister, data);
    const token = yield call(apiFetchToken, data);
    const result = response.data;

    yield put({ type: types.REGISTER_SUCCESS, result });
    yield put({ type: types.VERIFIED_TOKEN_SUCCESS, token });
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
    const token = verifyToken("_app");
    if (token) {
      const validToken = yield call(apiValidateToken, token);
      const response = yield call(
        apiFetchUser,
        validToken.data.data.user_id,
        token
      );
      yield put({
        type: types.FETCH_USER_SUCCESS,
        user: response.data,
        token: token
      });
    } else {
      yield put({
        type: types.FETCH_USER_FAILURE,
        error: { message: "Not logged in." }
      });
    }
  } catch (error) {
    yield put({ type: types.FETCH_USER_FAILURE, error });
  }
}

function* fetchAuthorSaga(data) {
  try {
    const token = verifyToken("_app");
    const response = yield call(apiFetchUser, data.userId, token);
    yield put({ type: types.FETCH_AUTHOR_SUCCESS, user: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_AUTHOR_FAILURE, error });
  }
}

function* fetchPostsSaga() {
  try {
    const response = yield call(apiFetchPosts);
    yield put({ type: types.FETCH_POSTS_SUCCESS, posts: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_POSTS_FAILURE, error });
  }
}

function* fetchPostSaga(data) {
  try {
    const token = verifyToken("_app");
    const response = yield call(apiFetchPost, data.postId);
    const author = yield call(apiFetchUser, response.data.author, token);
    yield put({ type: types.FETCH_POST_SUCCESS, post: response.data, author });
  } catch (error) {
    return yield put({ type: types.FETCH_POST_FAILURE, error });
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield call(apiFetchCategories);
    yield put({
      type: types.FETCH_CATEGORIES_SUCCESS,
      categories: response.data
    });
  } catch (error) {
    yield put({ type: types.FETCH_CATEGORIES_FAILURE, error });
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
      data.featuredMedia
    );
    yield put({ type: types.ADD_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.ADD_POST_FAILURE, error });
  }
}

function* addMediaSaga(data) {
  try {
    const response = yield call(apiAddMedia, data.token, data.media);
    yield put({ type: types.ADD_MEDIA_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.ADD_MEDIA_FAILURE, error });
  }
}

function* rootSaga() {
  yield all([
    takeEvery(types.REGISTER, registerSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
    takeEvery(types.VERIFIED_TOKEN, fetchTokenSaga),
    takeEvery(types.ADD_POST, addPostSaga),
    takeEvery(types.ADD_MEDIA, addMediaSaga),
    takeEvery(types.FETCH_USER, fetchUserSaga),
    takeEvery(types.FETCH_USERS, fetchUsersSaga),
    takeEvery(types.FETCH_POSTS, fetchPostsSaga),
    takeEvery(types.FETCH_POST, fetchPostSaga),
    takeEvery(types.FETCH_CATEGORIES, fetchCategoriesSaga),
    takeEvery(types.FETCH_AUTHOR, fetchAuthorSaga)
  ]);
}

export default rootSaga;
