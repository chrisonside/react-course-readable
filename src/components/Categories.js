import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getCategories,
  getPostsByCategory,
  addFilter
} from '../actions';


class Categories extends Component {

  /*
    * Once this component has rendered, call the posts API to update our app with the categories data
  */
  componentDidMount() {
    this.props.getCategories();
  }

  /* 
    * Update filter property in Redux state, based on user interaction with category controls
  */
  dealWithFilterClick = (filter) =>  {
    let filterApplied;

    if(filter === 'show all') {
      filterApplied = null;
    } else {
      filterApplied = filter;
    }

    // console.log(filterApplied);
  
    this.props.addFilter(filterApplied)
    this.props.getPostsByCategory(filterApplied);
  }

  render() {

    const { categories } = this.props;

    return (
      <div className="categories">
        {Array.isArray(categories) && (
            <ul className="categories__list">
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link
                    to={`/${cat.name}`}
                    className='close-search'
                    onClick={() => this.dealWithFilterClick(`${cat.name}`)}>
                      {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => this.dealWithFilterClick('show all')}>Show all</button>
              </li>
            </ul>
          )}
      </div>
    );
  }
}


// Format shape of store data for this component
function mapStateToProps( {categories} ) {
  return {
    categories,
  }
}


// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    addFilter: (category) => dispatch(addFilter(category))
  }
}

// Use connect to access store context set by Provider, and pass in parts of state and action-dispatches to the component as props
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Categories);
