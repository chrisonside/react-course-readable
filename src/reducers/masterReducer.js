import { combineReducers } from 'redux';

// Import reducers
import { categories } from './categories';
import { comments } from './comments';
// import { filter } from './filter';
import { posts } from './posts';
import { votes } from './votes';

export default combineReducers({
  categories,
  comments,
  // filter,
  posts,
  votes
});