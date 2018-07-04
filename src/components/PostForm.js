import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TickSymbol from 'react-icons/lib/fa/check';
import {
  addPost
} from '../actions';

/* 
  * The following validation code is based on a technique explained in this article - https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
*/
const validate = val => {
  const errors = {};
    if (!val.title) {
      errors.title = 'Required';
    }
    if (!val.body) {
      errors.body = 'Required';
    }
    if (!val.author) {
      errors.author = 'Required';
    }
    if (!val.category) {
      errors.category = 'Required';
    }
    return errors;
}
/* 
  * As above, following code taken from this article - https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
*/
const renderfield = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="form__inputs">
      <label className="field">{label}</label>
      <input className="input" {...input} placeholder={label} type={type}/>
      {touched && ((error && <div className='input__error'>{error}</div>))}
    </div>
  </div>
)

/* This form is based on https://redux-form.com/6.7.0/examples/simple/ and https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form */
class PostForm extends Component {

  /* 
    * Handle form values
  */
  handleFormValues = (values) => {  
    this.props.addPost(values.title, values.body, values.author, values.category);
  };

  render() {

    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props;

    return (
      <div>
        <Link
          to={`/`}
          className='post__link'>
            Back to home page
        </Link>
        {(submitSucceeded) && (
          <div>
            <div>Post successfully submitted!</div>
            <TickSymbol className="form__icon" size={50}/>
          </div>
        )}
        {(!submitSucceeded) && (
           <form onSubmit={handleSubmit(this.handleFormValues)}>
            <div className="form__field">
              <label>Post title</label>
              <div>
                <Field
                  name="title"
                  component={renderfield}
                  type="text"
                  placeholder="Post title"
                />
              </div>
            </div>
            <div className="form__field">
              <label>Post Body</label>
              <div>
                <Field
                  name="body"
                  component={renderfield}
                  type="text"
                  placeholder="Body copy"
                />
              </div>
            </div>
            <div className="form__field">
              <label>Author</label>
              <div>
                <Field
                  name="author"
                  component={renderfield}
                  type="text"
                  placeholder="Author"
                />
              </div>
            </div>
            <div className="form__field">
              <div className="form__inputs">
                <label className="label">Category</label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="redux" checked />
                  Redux
                  {' '}
                </label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="react" />
                  React
                  {' '}
                </label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="udacity" />
                  Udacity
                  {' '}
                </label>
              </div>
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting}>Submit</button>
              <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear form
              </button>
            </div>
          </form>
        )} 
      </div>
    )
  }
}

// Bind dispatch to the action creators required for this component
function mapDispatchToProps(dispatch) {
  return {
    addPost: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
  }
}

PostForm = connect(
  null,
  mapDispatchToProps
)(PostForm);

// Hook our form up to the store
export default reduxForm({
  form: 'PostForm', // a unique identifier for form
  validate,
})(PostForm)