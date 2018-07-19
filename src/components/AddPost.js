import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TickSymbol from 'react-icons/lib/fa/check';
import '../styles/form.css';
import {
  addPost,
  getPostAndCommentsById
} from '../actions';

/*  
  * This form is based on techniques mentioned in 2 different articles: 
  * https://redux-form.com/6.7.0/examples/simple/ and https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
  * https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
*/

/* 
  * Validate form values
*/
const validate = val => {
  const errors = {};
  if (!val.title) {
    errors.title = 'Please enter a title';
  }
  if (!val.body) {
    errors.body = 'Please enter body copy for your post';
  }
  if (!val.author) {
    console.log(val.author);
    errors.author = 'Please enter your name';
  }
  if (!val.category) {
    errors.category = 'Please enter a category';
  }
  // Useful for debugging
  console.log(errors);
  return errors;
}

/*
  * Function to render inputs for form
*/
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form__entry">
    <label className="form__label">{label}</label>
    <input className="form__input-box" {...input} type={type}/>
    {touched && ((error && <div className="form__error">{error}</div>) || (warning && <span>{warning}</span>))}
  </div>
)

/*
  * Function to render radio buttons for form
*/
const renderRadioButtons = ({ meta: { touched, error, warning } }) => (
  <div className="form__entry">
    <div className="form__category-label">Category:</div>
    <label className="form__radio">
      <Field name="category" component="input" type="radio" value="redux" />
        {' '}
        Redux
    </label>
    <label className="form__radio">
      <Field name="category" component="input" type="radio" value="react" />
        {' '}
        React
    </label>
    <label className="form__radio">
      <Field name="category" component="input" type="radio" value="udacity" />
        {' '}
        Udacity
    </label>
    {touched && ((error && <div className="form__error">{error}</div>) || (warning && <span>{warning}</span>))}
  </div>
)

class AddPost extends Component {
  /* 
    * Handle form values input by user and dispatch action to add post to server
  */
  handleFormValues = (values) => {
    const { title, body, author, category } = values;
    this.props.addPost(title, body, author, category);
  };

  render() {

    const { handleSubmit, pristine, reset, submitting, submitSucceeded, currentPost } = this.props;

    return (
      <div>
        <Link
          to={`/`}
          className='post__link'>
            Back to home page
        </Link>
        {(submitSucceeded) && (
          <div className="form__confirmation">
            <div className="form__success">Thanks! Your post has been successfully submitted!</div>
            <TickSymbol className="form__icon" size={70}/>
          </div>
        )}
        {(!submitSucceeded) && (
           <form className="form" onSubmit={handleSubmit(this.handleFormValues)}>
            <h1 className="form__title">Add a new post</h1>
            <div className="form__field">
              <Field name="title" component={renderField} type="text" label="Post title"/>
            </div>
            <div className="form__field">
              <Field name="body" component={renderField} type="text" label="Post body"/>
            </div>
            <div className="form__field">
              <Field name="author" component={renderField} type="text" label="Author"/>
            </div>
            <div className="form__field">
              <div className="form__inputs">
                <Field name="category" component={renderRadioButtons}/>
              </div>
            </div>
            <div>
              <button className="form__submit" type="submit" disabled={pristine || submitting}>Submit</button>
              <button className="form__clear" type="button" disabled={pristine || submitting} onClick={reset}>
                Clear
              </button>
            </div>
          </form>
        )} 
      </div>
    )
  }
}

function mapStateToProps( {currentPost} ) {
  return {
    currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
    getPostAndCommentsById: (id) => dispatch(getPostAndCommentsById(id)),
  }
}

AddPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);

// Hook our form up to the store
export default reduxForm({
  form: 'AddPost', // a unique identifier for form
  validate,
})(AddPost)