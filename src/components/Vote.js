import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import { voteOnPost } from '../actions';

class Vote extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  /*
    * Function to call the Books API and update our app's state with the latest books data
  */
  handleVote(id, voteDirection) {
    this.props.voteOnPost(id, voteDirection);
  }

  render() {

    const { post } = this.props;

    return (
      <div className='vote'>
        <ThumbsUpIcon className="vote__icon" onClick={() => this.handleVote(post.id, 'upVote')} size={30}/>
        <ThumbsDownIcon className="vote__icon" onClick={() => this.handleVote(post.id, 'downVote')} size={30}/>
      </div>
    )
  }
}

// Format shape of store data for this component
function mapStateToProps({ posts }) {
  return {
    posts
  }
}


function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (id, option) => dispatch(voteOnPost(id, option))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Vote);