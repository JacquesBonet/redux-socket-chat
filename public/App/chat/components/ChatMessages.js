import React,{Component,PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {TYPING} from '../constants/ActionTypes'
import ChatMessage from './ChatMessage'
import ChatLog from './ChatLog'
import {SEND_MESSAGE} from '../constants/ActionTypes'
import GeminiScrollbar from 'react-gemini-scrollbar'
import {ChatAttributesPropTypes} from '../constants/ChatPropTypes'

export default class ChatMessages extends Component {
  static propTypes = ChatAttributesPropTypes
  state = {
    prevUsername: '',
    lastMsgTime: 0
  }

  constructor(props) {
    super(props)
    this.renderMessage = this.renderMessage.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState( {
      prevUsername: '',
      lastMsgTime: 0
    })
  }

  componentWillUpdate() {
    var node = findDOMNode(this)
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.refs.gemini.scrollbar._viewElement.scrollTop = this.refs.gemini.scrollbar._viewElement.scrollHeight
    }
  }

  renderMessage( item, index) {
    let first = false
    let prevUsername = this.state.prevUsername
    if (item.type != SEND_MESSAGE)
      return (
        <ChatLog key={index} message={item.message}/>
      )
    let timeFromLastMessage = item.date - this.state.lastMsgTime
    this.state.lastMsgTime = item.date
    this.state.prevUsername = item.username
    if ((timeFromLastMessage) > 60000 || (item.username != prevUsername))
      first = true

    return (
      <ChatMessage key={index} first={first} currUsername={this.props.currUsername} itemData={item}/>
    )
  }

  render() {
    const {messages}=this.props
    return (
      <div className="chat-messages">
        <GeminiScrollbar ref='gemini' autoshow={true} className="scroll-bar" ref='gemini'>
          {
            messages.map(this.renderMessage)
          }
        </GeminiScrollbar>
      </div>
    )
  }
}


