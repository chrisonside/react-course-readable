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
    console.log(categories);

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

  let categoriesArray = null;

  /*  Convert categories data from my Redux store's object format to an array for easy looping over in this component */
  if(categories) {

    let objectKeys = [Object.keys(categories)],
        i = 0;

    categoriesArray = [];

    const data = categories;

    objectKeys[0].map((objKey) => {
      categoriesArray.push(data[objKey]);
    });
  
  }

  return {
    categories: categoriesArray
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
