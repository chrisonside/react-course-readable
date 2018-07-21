import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from './Vote';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';
import '../styles/comments.css';

class Comments extends Component {

  render() {

    const { comments } = this.props;

    return (
      <div className="comments">
        {(comments !== null && comments.length > 0) && (
          <div>
            <h2 className="comments__heading">Comments:</h2>
            <p className="comments__tip comments__tip--posts-present">There are currently {comments.length} comments about this post...</p>
            <ul className="comments__list">
              {comments.map(comment => (
                <li key={comment.id} className="comments__item">
                  <p className='comments__body'>{comment.body}</p>
                  <p className='comments__details'><Timestamp time={convertToSeconds(`${comment.timestamp}`)} format='full' includeDay />, by {comment.author}</p>
                  <div className='comments__votes'>
                    <div className="comments__vote-score">Votes: {comment.voteScore}</div>
                    <Vote post={comment} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(comments === null) && (
          <p className="comments__tip">No comments just yet... Be the first to comment!</p>
        )}
      </div>
    );
  }
}

// Format shape of store data for this component
function mapStateToProps( {currentPost} ) {

  /*  Convert comments data from my Redux store's object format to an array for easy looping over in this component */
  let commentsArray = null;

  if(currentPost && currentPost.commentCount > 0) {

    const comments = currentPost.comments;

    if (typeof comments !== 'undefined') {
      let objectKeys = [Object.keys(comments)],
        i = 0;

      commentsArray = [];

      const data = comments;

      objectKeys[0].map((objKey) => {
        commentsArray.push(data[objKey]);
      });

    }

  }

  return {
    comments: commentsArray
  }
}

export default connect(
  mapStateToProps, null)(Comments);
