import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactLoading from 'react-loading';
import Categories from './Categories';
import Sort from './Sort';
import Vote from './Vote';
import Timestamp from 'react-timestamp';
import { convertToSeconds } from '../utils/helper';
import { isObjectEmpty } from '../utils/helper';
import PlusSign from 'react-icons/lib/fa/plus-circle';
import '../styles/postList.css';

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
    if (typeof category === 'undefined') {
      this.props.getAllPosts();
    } else {
      this.props.getPostsByCategory(category);
    }
  }

  render() {

    const { posts } = this.props;

    return (
      <div>
        <Categories />
        <Sort />
        <div className="posts">
          <Link
            to={'/add-post'}
            className='posts__link posts__link--add'>
              Add post
              <PlusSign className="posts__add-icon" size={30}/>
          </Link>
          {(posts !== null && posts.length > 0) && (
            <div>
              <hr className="post__divider post__divider--list" />
              <ul className="posts__list">
                {posts.map(post => (
                  <li key={`${post.id}`} className="posts__item">
                    <h2 className='post__title'>{post.title}</h2>
                    <h3 className='post__author'>by {post.author}</h3>
                    <p className='post__timestamp'><Timestamp time={convertToSeconds(`${post.timestamp}`)} format='full' includeDay /></p>
                    <div className='post__votes'>
                      <div className="post__vote-score">Votes: {post.voteScore}</div>
                      <Vote post={post} />
                    </div>
                    <div className='post__comment-count'>
                      There are currently {post.commentCount} comments about this post.
                    </div>
                    <Link
                      to={`/${post.category}/${post.id}`}
                      className='post__see-more'>
                        See full post
                    </Link>
                    <br />
                    <hr className="post__divider post__divider--list" />
                  </li>
                ))}
              </ul>
            <Link
              to={'/add-post'}
              className='posts__link posts__link--add'>
                Add post
                <PlusSign className="posts__add-icon" size={30}/>
            </Link>
            </div>
          )}
          {(posts === null || posts.length === 0) && (
            <div>
              <p className="post__message">Sorry, there are no posts currently live in this category.</p>
              <Link
                  to={`/`}
                  className='post__link post__link--start'>
                    Take me back to start
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}


// Format shape of store data for this component
function mapStateToProps( {posts, sort} ) {

  /*  Convert posts data from my Redux store's object format to an array for easy looping over in this component */
  let postsArray = null;

  if(posts) {

    let objectKeys = [Object.keys(posts)],
        i = 0;

    postsArray = [];

    const data = posts;

    objectKeys[0].map((objKey) => {
      // Check if a post has been deleted before adding it to array
      if(data[objKey]['deleted'] === false) {
        postsArray.push(data[objKey]);
      }
    });

    /* Sort the posts */
    if(!isObjectEmpty(sort)) {
      const sortValue = sort.sortBy;
      postsArray.sort(function(a, b) {
        return b[sortValue] - a[sortValue]
      });
    }

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