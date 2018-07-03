import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  ADD_POST,
  VOTE_ON_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_FILTER
} from '../actions';

import { arrayToObject } from '../utils/helper'

export function posts(postsState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case  GET_POSTS :
      // The action payload for getAllPosts is an array, but I want to store it in object format in my Redux store, for easy look-ups
      const currentPosts = arrayToObject(payload, 'id');
      // So currently they are an an object containing keyed (by ID) objects
      return { 
        ...postsState[0] = currentPosts
      }

    // case GET_POSTS_BY_CATEGORY :
    //   console.log(action)
    //   return action.payload;
    // case GET_POST_BY_ID :
    //   console.log(action)
    //   return action.payload;
    // case ADD_POST :
    //   console.log(action)
    //   return action.payload;
    case VOTE_ON_POST :
      const id = payload.id;
      const updatedVote = payload.voteScore;
      return {
        ...postsState,
        [id]: {
            ...postsState[id],
            voteScore: updatedVote
        },
    };
      return action.payload;
    // case EDIT_POST :
    //   console.log(action)
    //   return action.payload;
    // case DELETE_POST :
    //   console.log(action)
    //   return action.payload;
    default :
      return postsState
    }

}
