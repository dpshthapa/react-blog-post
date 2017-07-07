import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action){
 switch (action.type){
   case FETCH_POST:
   //ES5 syntax
    // const post= action.payload.data;
    //  return const newState { ...state };
    //  newState[poste.id]=post;
    //  return newState;
    //Es6 syntax below
       return {...state, [action.payload.data.id]: action.payload.data };
       //
  case FETCH_POSTS:
    //  console.log(action.payload.data); //[post1, post2]
    return _.mapKeys(action.payload.data, 'id');

    case DELETE_POST:
    return _.omit(state, action.payload);

    default:
    return state;
 }
}
