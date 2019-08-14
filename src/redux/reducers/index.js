import { combineReducers } from "redux";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import authorReducer from "./authorReducer";

const rootReducer = combineReducers({
  root: appReducer,
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  post: postReducer,
  author: authorReducer
});

export default rootReducer;
