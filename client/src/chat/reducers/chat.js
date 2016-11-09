import {combineReducers} from 'redux'
import {USERJOINED,USER_LEFT,TYPING,SEND_MESSAGE} from '../constants/ActionTypes'
import getUsername from '../../utils/getUsername'

const initialState = {
  connected: false,
  currUsername: getUsername(),
  messages: [],
  numUsers: 0
}

export default function chat(state = initialState, action) {

  if (state == null)
    state = initialState

  switch (action.type) {
    case USERJOINED:
      return {...state, numUsers: state.numUsers++, messages: [ ...state.messages,action]}
    case USER_LEFT:
      return {...state, numUsers: state.numUsers--, messages: [ ...state.messages,action]}
    case SEND_MESSAGE:
    {
      return {...state, messages: [...state.messages, action]}
    }
    case TYPING:
      if (action.broadcast) {
        let messages = state.messages.filter((message, index) => message.type !== TYPING)
        if (action.message != '')
          return {currUsername:state.currUsername, messages: [...messages,action]}
        else
          return {currUsername:state.currUsername, messages: [...messages]}
      }
      else
        return state
    default :
      return state
  }
}

