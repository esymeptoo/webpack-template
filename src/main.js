import './styles/varibles.less'

function say(...args) {
  console.log(...args)
}

say('你好123')

if (module.hot) {
  module.hot.accept()
}
