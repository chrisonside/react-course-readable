import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getCategories,
} from '../actions';


class Categories extends Component {

  /*
    * Once this component has rendered, call the posts API to update our app with the categories data
  */
  componentDidMount() {
    this.props.getCategories();
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
                    className='categories__link'>
                      {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={`/`}
                  className='categories__link'>
                    Show all
                  </Link>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Categories);
