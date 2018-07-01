import * as API from '../utils/api';

// Set up constants which will be exported to reducers
export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID  = 'GET_POST_BY_ID';
export const GET_ALL_COMMENTS_FOR_POST = 'GET_ALL_COMMENTS_FOR_POST';
export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
// export const ADD_FILTER = 'ADD_FILTER';

/* 
  * 
  * All thunk action creators utilise this action creator to speak to the reducers 
  *
*/
export const updateReduxStore = (payload, type) => ({
  payload,
  type
});

// Export thunk action creators for use by components - using the thunk approach to release redux from its synchronous confines
export const getAllPosts = () => dispatch => (
  API
  .getAllPosts()
  .then(allPosts => dispatch(updateReduxStore(allPosts, GET_POSTS)))
);

export const getCategories = () => dispatch => (
  API
  .getCategories()
  .then(categories => dispatch(updateReduxStore(categories, GET_CATEGORIES)))
);

export const getPostsByCategory = (category) => dispatch => (
  API
  .getPostsByCategory(category)
  .then(posts => dispatch(updateReduxStore(posts, GET_POSTS)))
)

export const getPostById = (id) => dispatch => (
  API
  .getPostById(id)
  .then(post => dispatch(updateReduxStore(post, GET_POST_BY_ID)))
);

export const getAllCommentsForPost = (id) => dispatch => (
  API
  .getAllCommentsForPost(id)
  .then(comments => dispatch(updateReduxStore(comments, GET_ALL_COMMENTS_FOR_POST)))
);

export const getCommentById = (id) => dispatch => (
  API
  .getCommentById(id)
  .then(comment => dispatch(updateReduxStore(comment, GET_COMMENT_BY_ID)))
);

export const addPost = (title, body, author, category) => dispatch => (
  API
  .addPost(title, body, author, category)
  .then(post => dispatch(updateReduxStore(post, ADD_POST)))
)

export const addComment = (body, author, parentId) => dispatch => (
  API
  .addComment(body, author, parentId)
  .then(comment => dispatch(updateReduxStore(comment, ADD_COMMENT)))
)

export const voteOnPost = (id, option) => dispatch => (
  API
  .voteOnPost(id, option)
  .then(vote => dispatch(updateReduxStore(vote, VOTE_ON_POST)))
)

export const voteOnComment = (id, option) => dispatch => (
  API
  .voteOnComment(id, option)
  .then(vote => dispatch(updateReduxStore(vote, ADD_COMMENT)))
)

export const editPost = (id, title, body) => dispatch => (
  API
  .editPost(id, title, body)
  .then(vote => dispatch(updateReduxStore(vote, EDIT_POST)))
)

export const editComment = (id, timestamp, body) => dispatch => (
  API
  .editComment(id, timestamp, body)
  .then(comment => dispatch(updateReduxStore(comment, EDIT_COMMENT)))
)

export const deletePost = (id) => dispatch => (
  API
  .deletePost(id)
  .then(post => dispatch(updateReduxStore(post, DELETE_POST)))
)

export const deleteComment = (id) => dispatch => (
  API
  .deleteComment(id)
  .then(comment => dispatch(updateReduxStore(comment, DELETE_COMMENT)))
)

// export const addFilter = (payload, type = ADD_FILTER) => ({
//   payload,
//   type
// });