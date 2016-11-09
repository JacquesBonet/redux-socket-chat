import React,{Component,PropTypes} from 'react'
import { findDOMNode } from 'react-dom'
import styles from "../static/chat.css"
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import ChatHeader from './ChatHeader'
import {ChatContainerPropTypes} from '../constants/ChatPropTypes'



export default class ChatBox extends Component {
  static propTypes = ChatContainerPropTypes

  constructor(props) {
    super(props)
    this.slideToggle = this.slideToggle.bind(this)
  }

  render() {
    return (
      <div className="chat-box">
        <div className="chat-app">
          <ChatHeader slideToggle={this.slideToggle}/>
          <ChatMessages ref="chatMessages" {...this.props.chat}/>
          <ChatInput ref="chatInput" {...this.props}/>
        </div>
      </div>
    )
  }


  slideToggle() {
    let el = findDOMNode( this.refs.chatMessages)
    // Native
    el.style.transition = 'height 1s'
    if (parseInt(el.style.height, 10) === 0) {
      el.style.height = localStorage.getItem( 'prevMessagesHeight')
    }
    else {
      localStorage.setItem( 'prevMessagesHeight', el.style.height)
      el.style.height = '0px'
    }
    el = findDOMNode( this.refs.chatInput)
    el.style.transition = 'height 1s'
    if (parseInt(el.style.height, 10) === 0) {
      el.style.height = localStorage.getItem( 'prevInputHeight')
    }
    else {
      localStorage.setItem( 'prevInputHeight', el.style.height)
      el.style.height = '0px'
    }
  }
}






