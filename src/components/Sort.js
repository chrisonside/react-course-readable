import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/sort.css';

import {
  sortBy,
  SORT_POSTS
} from '../actions';

class Sort extends Component {

  /*
    * Function handles user interacting with sort button
  */
  handleOptionChange = (event) => {
    let selectedValue = event.target.value;
    // Update Redux store
    this.props.sortBy({sortBy: selectedValue}, SORT_POSTS);
  };

  render() {

    let { sort } = this.props;
    (sort === '') ? sort = 'timestamp': sort = sort;
    const sortingOptions = ['timestamp', 'voteScore'];

    return (
      <div className="sort">
        <span className="sort__label">Sort posts by:</span>
        <div className="sort__button">
          <select className="sort__select" onChange={(event) => this.handleOptionChange(event)}>
            <option value='timestamp'>date</option>
            <option value='voteScore'>votes</option>
          </select>
        </div>
      </div>
    );
  }
}

// Format shape of store data for this component
function mapStateToProps( {sort} ) {
  return {
    sort
  }
}

// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    sortBy: (filter, action) => dispatch(sortBy(filter, action)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Sort);
