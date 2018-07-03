import {
  GET_CATEGORIES
} from '../actions';

import { arrayToObject } from '../utils/helper'

export function categories(categoriesState = {}, action) {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case  GET_CATEGORIES : 
      const currentCategories = arrayToObject(payload.categories, 'name');
      return {
        ...categoriesState[0] = currentCategories
      }
    default : 
      return categoriesState
    }
}