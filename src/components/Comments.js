import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from './Vote';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';

class Comments extends Component {

  render() {

    const { comments } = this.props;

    return (
      <div className="comments">
        {(comments !== null && comments.length > 0) && (
          <div>
            <p className="comment__tip">There are currently {comments.length} comments about this post...</p>
            <ul className="comments__list">
              {comments.map(comment => (
                <li key={comment.id}>
                  <h2 className='comment__title'>{comment.title}</h2>
                  <p className='comment__body'>{comment.body}</p>
                  <p className='comment__timestamp'><Timestamp time={convertToSeconds(`${comment.timestamp}`)} format='full' includeDay /></p>
                  <p className='comment__author'>by {comment.author}</p>
                  <div className='comment__votes'>
                    Votes: {comment.voteScore}
                    <Vote post={comment} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(comments === null) && (
          <p className="comment__tip">No comments just yet... Be the first to comment!</p>
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

    if (comments !== undefined) {
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
