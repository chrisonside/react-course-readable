import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TickSymbol from 'react-icons/lib/fa/check';
import { isObjectEmpty } from '../utils/helper';
import '../styles/form.css';
import {
  editPost,
  getPostAndCommentsById
} from '../actions';

/*  
  * This form is based on techniques mentioned in 3 different articles: 
  * https://redux-form.com/6.7.0/examples/simple/ and https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
  * https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
  * https://www.davidmeents.com/create-redux-form-validation-initialized-values/
*/

const validate = val => {
  const errors = {};
    if (!val.title) {
      errors.title = 'Please enter a title';
    }
    if (!val.body) {
      errors.body = 'Please enter body copy for your post';
    }
    return errors;
}

const renderField = ({ input, label, type, value, meta: { touched, error, warning } }) => (
  <div className="form__entry">
    <label className="form__label">{label}</label>
    <input className="form__input-box" {...input} type={type} />
    {touched && ((error && <div className="form__error">{error}</div>) || (warning && <span>{warning}</span>))}
  </div>
)

class EditPost extends Component {

  componentDidMount() {
    this.handleFormInitialize();
  }

  /* 
    * Initialise redux form, inserting current values for this post that are editable
  */
  handleFormInitialize = () => {
    const { currentPost } = this.props; 
    if (!isObjectEmpty(currentPost)) {
      const initializeData = {
        "title": currentPost.title,
        "body": currentPost.body,
      };
      this.props.initialize(initializeData);
    }
  }

  /* 
    * Handle submitted form values, and dispatch action to add post to server
  */
  handleFormValues = (values) => {
    const { title, body } = values;
    const id = this.props.currentPost.id;
    this.props.editPost(id, title, body);
  }

  render() {

    const { initialize, handleSubmit, pristine, reset, submitting, submitSucceeded, currentPost } = this.props;

    // If this is the first page of our app the user lands on (e.g. if they had a url cached), redirect to home page
    if (isObjectEmpty(currentPost)) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <Link
          to={`/`}
          className='post__link'>
            Back to home page
        </Link>
        <div>
          {(submitSucceeded) && (
            <div className="form__confirmation">
              <div className="form__success">Post successfully edited!</div>
              <TickSymbol className="form__icon" size={70}/>
            </div>
          )}
          <form className="form" onSubmit={handleSubmit(this.handleFormValues)}>
            <div className="form__field">
              <div>
                <Field
                  name="title"
                  component={renderField}
                  type="text"
                  label="Form Title"
                />
              </div>
            </div>
            <div className="form__field">
              <div>
                <Field
                  name="body"
                  component={renderField}
                  type="text"
                  label="Form Body"
                />
              </div>
            </div>
            <div>
              <button className="form__submit" type="submit">Submit</button>
              <button className="form__clear" type="button" onClick={reset}>
                Clear form
              </button>
            </div>
          </form>
        </div>
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
    getPostAndCommentsById: (id) => dispatch(getPostAndCommentsById(id)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
  }
}

EditPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

// Hook our form up to the store
export default reduxForm({
  form: 'EditPost',
  validate
}, mapStateToProps)(EditPost)