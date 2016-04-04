import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatBox from '../components/ChatBox'
import * as chatActions from '../actions'
import {ChatContainerPropTypes} from '../constants/ChatPropTypes'

class ChatContainer extends Component {
  static propTypes: ChatContainerPropTypes

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="chat-container">
          <ChatBox {...this.props}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)




