// Import constants from actions
import {
  VOTE_ON_POST,
  VOTE_ON_COMMENT
} from '../actions';

export function votes(state = {}, action) {
  switch (action.type) {
    case  VOTE_ON_POST : 
      return action.payload;
    case VOTE_ON_COMMENT : 
      return action.payload;
    default : 
      return state
    }
}