import React from 'react';
import PropTypes from 'prop-types';
import Vote from './Vote';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';

const Post = ({post}) => {

  return (
    <li>
      <h2>{`${post.title}`}</h2>
      <h3>by {`${post.author}`}</h3>
      <p><Timestamp time={convertToSeconds(`${post.timestamp}`)} format='full' includeDay /></p>
      <div>Votes: {post.voteScore}
        <Vote post={post} />
      </div>
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post;