import {USERJOINED,USER_LEFT,TYPING, SEND_MESSAGE} from '../constants/ActionTypes'

export function newMessage(data) {
  data.broadcast = true;
  return data
}

export function userJoined(username, message) {
  return {
    type: USERJOINED,
    date: Date.now(),
    message,
    username
  }
}

export function userLeft(username, message) {
  return {type: USER_LEFT, username, message}
}

export function sendMessage(username, message) {
  return {
    type: SEND_MESSAGE,
    date: Date.now(),
    message,
    username
  }
}
export function typing(username, message) {
  return {type: TYPING, username, message}
}

