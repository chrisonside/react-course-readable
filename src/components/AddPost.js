import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TickSymbol from 'react-icons/lib/fa/check';
import {
  addPost,
  getPostAndCommentsById
} from '../actions';

/* 
  * The following validation code is based on a technique explained in this article - https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
*/
const validate = val => {
  const errors = {};

    console.log(val.title);

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
      <input className="input" {...input} type={type} value={label} />
      {touched && ((error && <div className='input__error'>{error}</div>))}
    </div>
  </div>
)

/* This form is based on https://redux-form.com/6.7.0/examples/simple/ and https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form */
class PostForm extends Component {

  state = {
    view: ''
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // Update current post in redux store in line with the ID in the url. 
    // This won't be an issue if someone has come straight from post page (as that would have updated the currentPost redux values)
    // However this safeguards against someone landing fresh on this URL (and potentially having no/outdated currentPost data)
    if(id) {
      this.setState({ view: 'edit-post' });
      this.props.getPostAndCommentsById(id);
    } else {
      this.setState({ view: 'add-post' });
    }
  }

  /* 
    * Handle form values, dispatch action depending on whether we are adding or editing post
  */
  handleFormValues = (values) => {
    if(this.state.view === 'edit-post') {
      console.log('editing page')
      console.log(values);
      // this.props.addPost(values.title, values.body, values.author, values.category);
    } else {
      console.log('adding page')
      console.log(values);
      // this.props.addPost(values.title, values.body, values.author, values.category);
    }
    
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
          <div>
            <div>Post successfully submitted!</div>
            <TickSymbol className="form__icon" size={50}/>
          </div>
        )}
        {(!submitSucceeded) && (
           <form onSubmit={handleSubmit(this.handleFormValues)}>
            <div className="form__field">
              <div>
                <label className="field">Title</label>
                <Field
                  name="title"
                  component={renderfield}
                  type="text"
                  label={(currentPost['title'] !== 'undefined') && (`${currentPost.title}`)}
                />
              </div>
            </div>
            <div className="form__field">
              <div>
                <label className="field">Body</label>
                <Field
                  name="body"
                  component={renderfield}
                  type="text"
                  label={(currentPost['body'] !== 'undefined') && (`${currentPost.body}`)}
                />
              </div>
            </div>
            <div className="form__field">
              <div>
                <label className="field">Author</label>
                <Field
                  name="author"
                  component={renderfield}
                  type="text"
                  label={(currentPost['author'] !== 'undefined') && (`${currentPost.author}`)}
                />
              </div>
            </div>
            <div className="form__field">
              <div className="form__inputs">
                <label className="label">Category</label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="redux" id="js-radio-redux" checked />
                  Redux
                  {' '}
                </label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="react" id="js-radio-react" />
                  React
                  {' '}
                </label>
                <label className="radio">
                  <Field name="category" component="input" type="radio" value="udacity" id="js-radio-udacity" />
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

PostForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

// Hook our form up to the store
export default reduxForm({
  form: 'PostForm', // a unique identifier for form
  validate,
})(PostForm)