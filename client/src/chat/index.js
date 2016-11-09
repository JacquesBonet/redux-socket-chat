import React from 'react'
import { render } from 'react-dom'
import Chat from './containers/Chat'
import './styles/css/gemini-scrollbar.css';
import './styles/css/style.css';
import './styles/css/font-awesome.min.css';


export default function initChat( id, username) {

  let rootElement = document.getElementById( id)

  render(
    <Chat id={id} username={username}/>, rootElement
  )
}

