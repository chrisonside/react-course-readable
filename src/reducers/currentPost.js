import {
  GET_POST_AND_COMMENTS_BY_ID,
  EDIT_POST,
  VOTE_ON_POST,
  VOTE_ON_COMMENT
} from '../actions';

import { arrayToObject } from '../utils/helper';
import { isObjectEmpty } from '../utils/helper';

export function currentPost(currentPostState = {}, action) {
  const { payload } = action;

  switch (action.type) {

    case  GET_POST_AND_COMMENTS_BY_ID : 
      return {
        ...currentPostState[0] = payload
      }

    case VOTE_ON_POST :
      const updatedPostVote = payload.voteScore;
      return {
        ...currentPostState,
        voteScore: updatedPostVote
      }

    case VOTE_ON_COMMENT :
      const id = payload.id;
      const updatedCommentVote = payload.voteScore;    
      return {
        ...currentPostState,
        ['comments']: {
            ...currentPostState['comments'],
            [id]: {
              ...currentPostState['comments'][id],
              voteScore: updatedCommentVote
            }
          }
      }

    case EDIT_POST :
      const updatedTitle = payload.title;
      const updatedBody = payload.body;
      return {
        ...currentPostState,
            title: updatedTitle,
            body: updatedBody
      }

    default : 
      return currentPostState
    }
}