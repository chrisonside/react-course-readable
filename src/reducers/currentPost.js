import {
  GET_POST_BY_ID,
  VOTE_ON_POST
} from '../actions';

export function currentPost(currentPostState = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case  GET_POST_BY_ID : 
      return {
        ...currentPostState[0] = payload
      }
    case VOTE_ON_POST :
      const id = payload.id;
      const updatedVote = payload.voteScore;
      return {
        ...currentPostState,
        voteScore: updatedVote
      }
    default : 
      return currentPostState
    }
}