import {
  GET_CATEGORIES
} from '../actions';

import { arrayToObject } from '../utils/helper'

export function categories(categoriesState = {}, action) {
  switch (action.type) {
    case  GET_CATEGORIES : 
      const { payload } = action
      const currentCategories = arrayToObject(payload.categories, 'name');
      return {
        ...categoriesState,
        currentCategories
      }
    default : 
      return categoriesState
    }
}