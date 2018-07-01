import { combineReducers } from 'redux';

// Import reducers
import { categories } from './categories';
import { comments } from './comments';
import { posts } from './posts';
import { votes } from './votes';

export default combineReducers({
  categories,
  comments,
  posts,
  votes
});