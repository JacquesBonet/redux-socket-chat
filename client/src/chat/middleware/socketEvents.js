import io from 'socket.io-client'
import {USERJOINED,USER_LEFT,TYPING,SEND_MESSAGE} from '../constants/ActionTypes'
import {newMessage} from '../actions'


export function socketMiddleware() {
  return next=>action=> {
    const result = next(action)
    if (socket) {
      switch (action.type) {
        case USERJOINED:
        case USER_LEFT:
        case TYPING:
        case SEND_MESSAGE:
          if (action.broadcast)
            break;
          console.log("socket.emit " + JSON.stringify(action))
          socket.emit(action.type, action)
          break
      }
    }
    return result
  }
}

export const socket = io('http://localhost:3000')

export default function (store) {
  // Socket events
  const {dispatch}=store

  // Whenever the server emits 'new message', update the chat body
  socket.on(SEND_MESSAGE, (data) => {
    dispatch(newMessage(data))
  })

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on(USERJOINED, (data) => {
    dispatch(newMessage(data))
  })

  // Whenever the server emits 'user left', log it in the chat body
  socket.on(USER_LEFT, (data) => {
    dispatch(newMessage(data))
  })

  // Whenever the server emits 'typing', show the typing message
  socket.on(TYPING, (data) => {
    dispatch(newMessage(data))
  })
}