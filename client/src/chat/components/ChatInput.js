import React,{Component,PropTypes} from 'react'
import * as constants from '../constants/index'
import {ChatContainerPropTypes} from '../constants/ChatPropTypes'



export default class ChatInput extends Component {
  static propTypes = ChatContainerPropTypes

  constructor(props) {
    super(props)
    this.onKeydown = this.onKeydown.bind(this)
    this.onChange = this.onChange.bind(this)
    this.point = ''
    this.interval = null
  }


  onKeydown(event) {
    // e.preventDefault()
    const {chat, chatActions}=this.props
    const node = this.refs.inpMessage

    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      node.focus()
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      //sendMessage()
      console.log("sendMessage:" + node.value.trim())
      chatActions.sendMessage( chat.currUsername, node.value.trim())
      node.value = ''
      event.preventDefault()
    }
  }

  onChange(e) {
    const {chatActions, chat}=this.props
    this.lastTypingTime = (new Date()).getTime()

    if (this.interval == null) {
      this.interval = setInterval(function () {
        var typingTimer = (new Date()).getTime()
        var timeDiff = typingTimer - this.lastTypingTime
        if (timeDiff >= constants.TYPING_TIMER_LENGTH) {
          if (this.point != '') {
            this.point = ''
            console.log('stop typing')
            chatActions.typing(chat.currUsername, '')
          }
        }
        else {
          console.log('typing: %s', chat.currUsername)
          chatActions.typing(chat.currUsername, chat.currUsername + ' is typing msg' + this.point)
          this.point += '.'
        }
      }.bind(this), constants.TYPING_TIMER_LENGTH)
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  }

  render() {
    return (
      <div className="ui-widget-content ui-chatbox-input">
        <textarea className="ui-widget-content ui-chatbox-input-box" placeholder="Type here..." ref="inpMessage" onChange={this.onChange}></textarea>
      </div>
    )
  }
}

