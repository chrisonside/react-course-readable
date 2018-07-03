import { combineReducers } from 'redux';

// Import reducers
import { categories } from './categories';
import { comments } from './comments';
import { posts } from './posts';

export default combineReducers({
  categories,
  comments,
  posts
});