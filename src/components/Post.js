import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper'

const Post = ({post}) => {

  return (
    <li>
      <h2>{`${post.title}`}</h2>
      <h3>by {`${post.author}`}</h3>
      <p><Timestamp time={convertToSeconds(`${post.timestamp}`)} format='full' includeDay /></p>
      <p>Votes: {post.voteScore}</p>
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post;