import {PropTypes} from 'react'

export const MessagePropTypes = {
  date: PropTypes.number.isRequired,
  first: PropTypes.bool,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export const ChatAttributesPropTypes = {
  connected: PropTypes.bool.isRequired,
  currUsername: PropTypes.string.isRequired,
  messages: PropTypes.array(PropTypes.shape(MessagePropTypes)),
  numUsers: PropTypes.number.isRequired
};

export const ChatActionsPropTypes = {
  sendMessage: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired,
  userJoined: PropTypes.func,
  userLeft: PropTypes.func
};

export const ChatContainerPropTypes = {
  chat: PropTypes.shape(ChatAttributesPropTypes),
  chatActions: PropTypes.shape(ChatActionsPropTypes)
};

export const ChatPropTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

