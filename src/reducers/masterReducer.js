import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import reducers
import { categories } from './categories';
import { currentPost } from './currentPost';
import { posts } from './posts';
import { sort } from './sort';

export default combineReducers({
  categories,
  currentPost,
  posts,
  sort,
  form: formReducer
});