import {combineReducers} from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';
import authorReducer from './authorReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    root: appReducer,
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    post: postReducer,
    author: authorReducer,
    search: searchReducer,
});

export default rootReducer;
