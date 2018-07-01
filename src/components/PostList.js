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
  getPostsByCategory,
  addFilter
} from '../actions';


class PostList extends Component {

  /*
    * Once this component has rendered, call the posts API to update our app with the posts data
  */
  componentDidMount() {
    const { category } = this.props.match.params;
    // If there is no category param in the url - i.e. we are on the home page
    if (category === undefined) {
      this.props.getAllPosts();
      this.props.addFilter(null)
    } else {
      this.props.getPostsByCategory(category);
      this.props.addFilter(category);
    }
  }

  render() {

    // const { filter, posts } = this.props;
    const { posts } = this.props;

    // const filteredPosts = this.filterPosts(filter, posts);

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
    filter,
    posts: postsArray
  }

}


// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    addFilter: (category) => dispatch(addFilter(category))
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(PostList);