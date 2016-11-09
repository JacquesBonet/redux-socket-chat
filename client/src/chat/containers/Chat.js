import React,{Component} from 'react'
import { Provider } from 'react-redux'
import {ChatPropTypes} from '../constants/ChatPropTypes'
import ChatContainer from './ChatContainer'
import * as chatActions from '../actions'
import configureStore from '../store/configureStore'
import socketEvents from '../middleware/socketEvents'


export default class Chat extends Component {
  static propTypes: ChatPropTypes

  constructor(props) {
    super(props)
    this.store = configureStore()
    socketEvents(this.store)
  }

  componentDidMount() {
    this.store.dispatch( chatActions.userJoined( this.props.username, this.props.username + ' joined!'))
  }

  render() {
    return (
      <Provider store={this.store}>
        <ChatContainer/>
      </Provider>
    )
  }
}





