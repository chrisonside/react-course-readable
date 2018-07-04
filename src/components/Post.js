import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vote from './Vote';
import Comments from './Comments';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';
import { isObjectEmpty } from '../utils/helper';

import {
  getPostById,
} from '../actions';

class Post extends Component {

  /* 
    * Grab post requested via the id in the URL parameter
    * CurrentPost then set in Redux store, and this component is subscribed to the currentPost state updates
  */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPostById(id);
  }

  render() {

    const { currentPost } = this.props;

    return (
      <div>
        {(!isObjectEmpty(currentPost)) && (
          <div>
            <h1 className='post__title'>{currentPost.title}</h1>
            <p className='post__body'>{currentPost.body}</p>
            <p className='post__timestamp'><Timestamp time={convertToSeconds(`${currentPost.timestamp}`)} format='full' includeDay /></p>
            <div className='post__votes'>Votes: {currentPost.voteScore}
              <Vote post={currentPost} />
            </div>
            <Link
              to={`/`}
              className='post__link'>
                Back to home page
            </Link>
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
    getPostById: (id) => dispatch(getPostById(id)),
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post);