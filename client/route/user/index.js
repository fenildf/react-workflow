import {combineReducers} from 'redux'

export default {
  path: '/user',
  getComponent: (location, cb) => {
    require.ensure([], (require) => {

      // ensure not init reducers again
      if(!window.rootCombineReducer.user) {
        window.rootCombineReducer.user = require('./reducers').default
        const nextReducer = combineReducers(window.rootCombineReducer)
        window.store.replaceReducer(nextReducer)
      }
      cb(null, require('./containers/App').default)

    })
  },
}

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    window.rootCombineReducer.user = require('./reducers').default
    const nextReducer = combineReducers(window.rootCombineReducer)
    window.store.replaceReducer(nextReducer)
  })
}
