import { combineReducers } from 'redux';

// Import reducers
import { categories } from './categories';
import { currentPost } from './currentPost';
import { posts } from './posts';
import { sort } from './sort';

export default combineReducers({
  categories,
  currentPost,
  posts,
  sort
});