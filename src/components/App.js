import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import Timestamp from 'react-timestamp';
import '../App.css';
import Post from './Post';
//
import {
  getAllPosts,
  getCategories,
  getPostsByCategory,
  getPostById,
  addPost,
  voteOnPost,
  editPost,
  deletePost
} from '../actions';


class App extends Component {

  state = {
    // dataLoading: false,
    filterApplied: null,
    errorMessage: ''
  }

  /*
    * Once this component has rendered, call the posts API to update our app with the posts data
  */
  componentDidMount() {
    // TO-DO - Show the loading spinner
    // this.setState({ dataLoading: true });
    // Grab the post data via the getAllPosts action creator which has been mapped to dispatch
    // this.props.getAllPosts();
    // this.props.addPost('blahhhhh title goes here', 'body goes here', 'chris r', 'redux');
    this.props.getCategories();
    // this.props.getPostsByCategory('redux');
    // this.props.getPostById('6ni6ok3ym7mf1p33lnez');
    // this.props.voteOnPost('6ni6ok3ym7mf1p33lnez', 'upVote');
    // this.props.editPost('6ni6ok3ym7mf1p33lnez', 'My shiny new title', 'ohhh yeah it\'s new');
    // this.props.getAllPosts();
    // this.props.deletePost('6ni6ok3ym7mf1p33lnez');
    this.props.getAllPosts();
    // Now work out how to output that to the page, and remove the loading spinner!
  }

  /* 
    * Function to help filter post list based on user interaction with category controls
  */
  dealWithFilterClick = (filter) =>  {
    let filterApplied;

    if(filter === 'show all') {
      filterApplied = null;
    } else {
      filterApplied = filter;
    }

    this.setState(() => ({
      filterApplied
    }))
  }

  /* 
    * Convert unix timestamp from milliseconds
  */
  convertToSeconds = (timeStamp) => {
    if(timeStamp) {
      return timeStamp.substring(0,10);
    }
  }

  filterPosts = (filter, posts) => {
    if(filter === null) {
      return posts;
    } else {
      const filteredPosts = posts.filter(post => post.category === filter);
      return filteredPosts;
    }
  }

  render() {

    const { categories, posts } = this.props;
    const { filterApplied } = this.state;

    const filteredPosts = this.filterPosts(filterApplied, posts);
    console.log(filteredPosts);

    return (
      <div className="App">
        {Array.isArray(categories) && (
          <ul className="categories__list">
            {categories.map(cat => (
              <li key={cat.name}>
                <button type="button" onClick={() => this.dealWithFilterClick(`${cat.name}`)}>{cat.name}</button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => this.dealWithFilterClick('show all')}>Show all</button>
            </li>
          </ul>
        )}
        {(filteredPosts !== null && filteredPosts.length > 0) && (
          <ul className="posts__list">
            {filteredPosts.map(filteredPost => (
              <Post key={filteredPost.id} post={filteredPost} />
            ))}
          </ul>
        )}
        {(filteredPosts !== null && filteredPosts.length === 0) && (
          <p>Sorry, there are no posts to display</p>
        )}
      </div>
    );
  }
}


// Format shape of store data for this component
function mapStateToProps( {categories, posts} ) {

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
    categories,
    posts: postsArray
  }

}


// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getCategories: () => dispatch(getCategories()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    getPostById: (id) => dispatch(getPostById(id)),
    addPost: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
    voteOnPost: (id, vote) => dispatch(voteOnPost(id, vote)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    deletePost: (id) => dispatch(deletePost(id)),
    // selectRecipe: (data) => dispatch(addRecipe(data)),
    // remove: (data) => dispatch(removeFromCalendar(data))
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);
