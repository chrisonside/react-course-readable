import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TickSymbol from 'react-icons/lib/fa/check';
import {
  addPost,
  editPost,
  getPostAndCommentsById
} from '../actions';

/* 
  * Following code based on this article - https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
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
class EditPost extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    // Update current post in redux store in line with the ID in the url. 
    // This won't be an issue if someone has come straight from post page (as that would have updated the currentPost redux values)
    // However this safeguards against someone landing fresh on this URL (and potentially having no/outdated currentPost data)
    this.props.getPostAndCommentsById(id);
  }

  /* 
    * Handle form values, dispatch action depending on whether we are adding or editing post
  */
  handleFormValues = (values) => {
      console.log(this.props.currentPost.id);
      this.props.editPost(this.props.currentPost.id, values.title, values.body);
  }

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
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={reset}>
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
    editPost: (id, title, body) => dispatch(addPost(id, title, body)),
  }
}

EditPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

// Hook our form up to the store
export default reduxForm({
  form: 'EditPost',
})(EditPost)