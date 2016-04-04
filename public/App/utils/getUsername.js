const USER_NAMES = [
  'j.bonet', 'p.durand, 'k.smidt', 'a.powel', 's.kristensen'
]

var newCurrent = Math.round( (Math.random() * USER_NAMES.length) % USER_NAMES.length)

export default function getUsername() {
  let userName = USER_NAMES[newCurrent]
  newCurrent = newCurrent == USER_NAMES.length - 1 ? 0 : newCurrent + 1
  return userName
}
