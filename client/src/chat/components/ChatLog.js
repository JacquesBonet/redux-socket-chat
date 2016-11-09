import React,{Component,PropTypes} from 'react'



export default class ChatLog extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="chat-message">
        <div className="message log-message">
          {this.props.message}
        </div>
      </div>
    )
  }
}



