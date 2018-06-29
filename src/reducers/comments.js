// Import constants from actions
import {
  GET_ALL_COMMENTS_FOR_POST,
  GET_COMMENT_BY_ID,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions';

export function comments(state = {}, action) {
  switch (action.type) {
    case  GET_ALL_COMMENTS_FOR_POST : 
      // return action.payload;
    case GET_COMMENT_BY_ID : 
      // return action.payload;
    case ADD_COMMENT : 
      // return action.payload;
    case EDIT_COMMENT : 
      // return action.payload;
    case DELETE_COMMENT : 
      // return action.payload;
    default : 
      return state
    }
}