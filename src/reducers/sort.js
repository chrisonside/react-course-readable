import {
  SORT_POSTS
} from '../actions';

const initialSortState = {
  sortBy: 'timestamp'
}

export function sort(sortState = initialSortState, action) {
  const { payload } = action;
  switch (action.type) {
    case  SORT_POSTS : 
      return {
        ...sortState[0] = payload
      }
    default : 
      return sortState
    }
}