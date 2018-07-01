// Import constants from actions
import {
  ADD_FILTER
} from '../actions';

export function filter(state = null, action) {
  switch (action.type) {
    case ADD_FILTER : 
      return action.payload;
    default : 
      return state
    }
}