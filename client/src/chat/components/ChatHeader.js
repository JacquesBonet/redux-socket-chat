import React,{Component,PropTypes} from 'react'

export default class ChatHeader extends Component {
  render() {
    return (
      <div className="chat-header chat-titlebar ui-dialog-header" onClick={this.props.slideToggle}>
        <span>Room</span>
        <a href="#" rel="tooltip" data-placement="top" data-original-title="Hide" className="ui-chatbox-icon" role="button">
          <i className="fa fa-times"></i>
        </a>
        <a href="#" rel="tooltip" data-placement="top" data-original-title="Minimize" className="ui-chatbox-icon" role="button">
          <i className="fa fa-minus"></i>
        </a>
      </div>
    )
  }
}





