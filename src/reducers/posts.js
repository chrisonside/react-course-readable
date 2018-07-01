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

export function posts(state = {}, action) {

  switch (action.type) {
    case  GET_POSTS :
      // // The action payload for getAllPosts is an array, but I want to store it in object format in my Redux store
      // const currentPosts = {};
      // for (let allPosts of action.payload) {
      //   currentPosts[allPosts.id] = allPosts;
      // }

      console.log('posts data getting updated by reducer');

      const currentPosts = arrayToObject(action.payload, 'id');
      // console.log(currentPosts);


      return { ...state, 
        allPosts : currentPosts
      }


      // return {
      //   // Object spread operator to return a copied & spread version of the old state object for us to work with
      //   ...state.posts,
      //   state.posts: action.payload
      // }
    // case GET_POSTS_BY_CATEGORY :
    //   console.log(action)
    //   return action.payload;
    // case GET_POST_BY_ID :
    //   console.log(action)
    //   return action.payload;
    // case ADD_POST :
    //   console.log(action)
    //   return action.payload;
    // case VOTE_ON_POST :
    //   console.log(action)
    //   return action.payload;
    // case EDIT_POST :
    //   console.log(action)
    //   return action.payload;
    // case DELETE_POST :
    //   console.log(action)
    //   return action.payload;
    default :
      return state
    }

}
