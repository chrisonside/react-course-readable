import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Vote from './Vote';
import Comments from './Comments';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';
import { isObjectEmpty } from '../utils/helper';
import '../styles/postList.css';

import {
  getPostAndCommentsById,
  deletePost
} from '../actions';

class Post extends Component {

  /* 
    * Grab post (and associated comments) requested via the id in the URL parameter
    * CurrentPost then set in Redux store, and this component is subscribed to the currentPost state updates
  */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPostAndCommentsById(id);
  }

   /* 
    * Dispatch action to delete post
    * Will trigger re-render of this component and redirect to home page as posts deleted property set to true.
  */
  handleDeletePost = (id) => {  
    this.props.deletePost(id);
  };

  render() {

    const { currentPost } = this.props;

    return (
      <div>
        {(currentPost.deleted) && (
          <Redirect to='/'/>
        )}
        {(!isObjectEmpty(currentPost)) && (
          <div>
            <div className="post">
              <Link
                to={'/'}
                className='post__link'>
                  Back to home page
              </Link>
              <h1 className='post__title'>{currentPost.title}</h1>
              <p className='post__body'>{currentPost.body}</p>
              <hr className="post__divider"/>
              <p className='post__author'>By {currentPost.author}</p>
              <p className='post__timestamp'><Timestamp time={convertToSeconds(`${currentPost.timestamp}`)} format='full' includeDay /></p>
              <div className='post__votes post__votes--base'>
                <div className="post__vote-score">Votes: {currentPost.voteScore}</div>
                <Vote post={currentPost} />
              </div>
              <Link
                to={`/edit-post/${currentPost.id}`}
                className='post__edit'>
                  Edit post
              </Link>
              <button className="post__delete" onClick={() => {this.handleDeletePost(`${currentPost.id}`)}}>Delete post</button>
            </div>
            <Comments />
          </div>
        )}
      </div>
    );
  }
}

// Format shape of store data for this component
function mapStateToProps( {currentPost} ) {
  return {
    currentPost
  }
}


// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    getPostAndCommentsById: (id) => dispatch(getPostAndCommentsById(id)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post);