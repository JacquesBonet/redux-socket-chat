import React from 'react'
import { render } from 'react-dom'
import Chat from './containers/Chat'


export default function initChat( id, username) {

  let rootElement = document.getElementById( id)

  render(
    <Chat id={id} username={username}/>, rootElement
  )
}

