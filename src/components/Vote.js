import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import { 
  voteOnPost, 
  voteOnComment
} from '../actions';

class Vote extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  /*
    * Function to handle user clicking on upVote/downVote
  */
  handleVote(post, voteDirection) {
    const id = post.id;
    // If it's a post we are voting on...
    if(post.hasOwnProperty('commentCount')){
      this.props.voteOnPost(id, voteDirection);
    } else {
      // Else if it's a comment
      console.log('voting on comment eh chief');
      this.props.voteOnComment(id, voteDirection);
    }
  }

  render() {

    const { post } = this.props;

    return (
      <div className='vote'>
        <ThumbsUpIcon className="vote__icon" onClick={() => this.handleVote(post, 'upVote')} size={30}/>
        <ThumbsDownIcon className="vote__icon" onClick={() => this.handleVote(post, 'downVote')} size={30}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (id, option) => dispatch(voteOnPost(id, option)),
    voteOnComment: (id, option) => dispatch(voteOnComment(id, option))
  }
}

export default connect(
  null,
  mapDispatchToProps)(Vote);