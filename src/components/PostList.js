import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactLoading from 'react-loading';
import Post from './Post';

import {
  getAllPosts,
  getPostById,
  addPost,
  voteOnPost,
  editPost,
  deletePost,
  getPostsByCategory
} from '../actions';


class PostList extends Component {

  /*
    * So the first time this posts component mounts, check URL to see if they are on home page or if they've landed on a category page.
    * Then call relevant action to display all/filtered posts
  */
  componentDidMount() {
    const { category } = this.props.match.params;
    // Fetch posts depending on route - if there is no category param in the url, we are on the home page
    this.getPosts(category);
  }

  /* 
    * Route update handled by Browser Router's Link component in Categories component
    * The optional :category parameter changing in the route triggers update of this component.
    * So now handle data updates on the back of user interaction (with back/forward button clicks, or category buttons)
  */
  componentDidUpdate(prevProps) {
    // To avoid an infinite loop, check URL category parameter has indeed been updated
    const { category } = this.props.match.params;
    if(category !== prevProps.match.params.category) {
      this.getPosts(category);
    }
  }

  /* 
    * Function to call action creators that retrieve posts from API
  */
  getPosts(category) {
    if (category === undefined) {
      this.props.getAllPosts();
    } else {
      this.props.getPostsByCategory(category);
    }
  }

  render() {

    const { posts } = this.props;

    return (
      <div classs="posts">
        {(posts !== null && posts.length > 0) && (
          <ul className="posts__list">
            {posts.map(filteredPost => (
              <Post key={filteredPost.id} post={filteredPost} />
            ))}
          </ul>
        )}
        {(posts !== null && posts.length === 0) && (
          <p>Sorry, there are no posts to display</p>
        )}
      </div>
    );
  }
}


// Format shape of store data for this component
function mapStateToProps( {filter, posts} ) {

  /*  I want posts data to be an array of objects so that it is easy to loop through them and display in the UI.
      So convert posts data from the nested object format which it is stored in the Redux store */
  let postsArray = null;

  if(posts.allPosts) {

    let objectKeys = [Object.keys(posts.allPosts)],
        i = 0;

    postsArray = [];

    const data = posts.allPosts;

    objectKeys[0].map((objKey) => {
      postsArray.push(data[objKey]);
    });
  
  }

  return {
    posts: postsArray
  }

}


// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(PostList);