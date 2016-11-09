import getUsername from './utils/getUsername'
import initChat from './chat'

let userName = getUsername()

initChat( 'content', userName)

