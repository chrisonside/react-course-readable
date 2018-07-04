/*
  * Connect to content API's endpoints, to manage storing, reading, updating, and deleting data for the app
*/

// TO-DO: Update this local development url when project goes to production
const api = '//localhost:3001'

// First see if there's a localStorage token set from previous sessions on the app
let authToken = localStorage.token
// If localStorage is not present yet, generate one and also assign to authToken ready for this API call
if (!authToken)
  authToken = localStorage.token = Math.random().toString(36).substr(-8)

// Set header required for API authorisation for GET requests
const authHeader = {
  headers: { 
    'Authorization': authToken 
  }
}
// Set header required for API authorisation for PUSH/PUT requests
const authPostHeader = { 
  'Authorization': authToken,
  'Content-Type': 'application/json'
}

// GET methods

export const getCategories = () => 
  fetch(`${api}/categories`, authHeader )
    .then(res => res.json());

export const getAllPosts = () => 
  fetch(`${api}/posts`, authHeader)
    .then(res => res.json());

export const getPostsByCategory = (category) => 
  fetch(`${api}/${category}/posts`, authHeader)
    .then(res => res.json());

export const getPostById = (postId) => 
  fetch(`${api}/posts/${postId}`, authHeader)
    .then(res => res.json());

export const getAllCommentsForPost = (postId) => 
  fetch(`${api}/posts/${postId}/comments`, authHeader)
    .then(res => res.json());

export const getCommentsById = (commentId) => 
  fetch(`${api}/posts/${commentId}/comments`, authHeader)
    .then(res => res.json());

// POST methods

export const addPost = (title, body, author, category) =>  {
  console.log(title, body, author, category);
  let timeNow = Date.now();
  let uuid = category + timeNow;
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: authPostHeader,
    body: JSON.stringify({ 
      id: uuid,
      timestamp: timeNow,
      title,
      body,
      author,
      category
    })
  })
  .then(res => res.json());
}

export const addComment = (body, author, parentId) => {
  let timeNow = Date.now();
  let uuid = parentId + timeNow;
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: authPostHeader,
    body: JSON.stringify({ 
      id: uuid,
      timestamp: timeNow,
      body,
      author,
      parentId
    })
  }).then(res => res.json());
}

export const voteOnPost = (id, option) => 
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: authPostHeader,
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const voteOnComment = (id, option) => 
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: authPostHeader,
    body: JSON.stringify({ option })
  }).then(res => res.json());


// PUT methods

export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: authPostHeader,
    body: JSON.stringify({ 
      title,
      body 
    })
  }).then(res => res.json());

export const editComment = (id, timestamp, body) => {
  let timeNow = Date.now();
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: authPostHeader,
    body: JSON.stringify({ 
      timestamp: timeNow,
      body
    })
  }).then(res => res.json());
}

// DELETE methods

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': authToken
    }
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': authToken
    },
  }).then(res => res.json());
