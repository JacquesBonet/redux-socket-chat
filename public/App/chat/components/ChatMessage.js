import React,{Component,PropTypes} from 'react'
import {SEND_MESSAGE,TYPING} from '../constants/ActionTypes'
import {MessagePropTypes} from '../constants/ChatPropTypes'


export default class ChatMessage extends Component {
  static propTypes = {
    first: PropTypes.bool.isRequired,
    currUsername: PropTypes.string.isRequired,
    itemData: PropTypes.shape(MessagePropTypes)
  }
  static lastMsgTime = 0

  renderMyFirstMessage(username, message, date, color) {
    let sDate = new Date( date).yyyymmddhhmm();
    let style = {
      borderTop: "2px solid " + LightenDarkenColor( color, 50)
    }
    return (
      <div className="chat-message first">
        <div className="message-data">
          <span className='message-data-name'><i className="fa fa-circle online"/>{username}</span>
          <span className="message-data-time"><i className="fa fa-clock-o"/>{sDate}</span>
        </div>
        <div className="message first" style={style}>
          {message}
        </div>
      </div>
    )
  }

  renderOtherFirstMessage(username, message, date, color) {
    let sDate = new Date( date).yyyymmddhhmm();
    let style = {
      borderTop: "2px solid " + LightenDarkenColor( color, 50)
    }
    return (
      <div  className="chat-message first">
        <div className="message-data">
          <span className='message-data-name'><i className="fa fa-circle online"/>{username}</span>
          <span className="message-data-time"><i className="fa fa-clock-o"/>{sDate}</span>
        </div>
        <div className="message first" style={style}>
          {message}
        </div>
      </div>
    )
  }

  renderMyNextMessage(message, color) {
    return (
      <div className="chat-message">
        <div className="message">
          {message}
        </div>
      </div>
    )
  }

  renderOtherNextMessage(message, color) {
    return (
      <div className="chat-message">
        <div className="message">
          {message}
        </div>
      </div>
    )
  }

  render() {
    const {message,username,date}=this.props.itemData
    let ret = ''
    let color = getUsernameColor(username)
    console.log( "SEND_MESSAGE " + username + " " + message)
    if (this.props.first) {
      if (this.props.currUsername == username)
        ret = this.renderMyFirstMessage(username, message, date, color)
      else
        ret = this.renderOtherFirstMessage(username, message, date, color)
    }
    else {
      if (this.props.currUsername == username)
        ret = this.renderMyNextMessage(message, color)
      else
        ret = this.renderOtherNextMessage(message, color)
    }
    ChatMessage.prevUsername = username
    ChatMessage.lastMsgTime = date
    return ret
  }
}


Date.prototype.yyyymmddhhmm = function() {
  let now = Date.now();
  let dateTime = this.getMilliseconds();
  if (now - dateTime < 3600000) {
    let hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    let min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return "".concat(min);
  }
  if (now - dateTime < 3600000 * 24) {
    let hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    let min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return "".concat(hh).concat(' ').concat(min);
  }
  let mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  let dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  let hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  let min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
  return "".concat(dd).concat('/').concat(mm).concat(' ').concat(hh).concat(':').concat(min);
};

function LightenDarkenColor(col, amt) {
  var usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  var num = parseInt(col,16);
  var r = (num >> 16) + amt;
  if (r > 255) {
    r = 255;
  }else if  (r < 0){
    r = 0;
  }
  var b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) {
    b = 255;
  }else if  (b < 0) {
    b = 0;
  }
  var g = (num & 0x0000FF) + amt;
  if (g > 255) {
    g = 255;
  }else if (g < 0) {
    g = 0;
  }
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

var COLORS = [
  '#E43825', '#A96D1D', '#f8a700', '#f78b00',
  '#5FC919', '#359E00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#8373DE', '#BF53F9', '#E383EC'
]
// Gets the color of a username through our hash function
function getUsernameColor(username) {
  // Compute hash code
  var hash = 7
  for (var i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash
  }
  // Calculate color
  var index = Math.abs(hash % COLORS.length)
  return COLORS[index]
}