import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers , applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from './components/App'
// import Foo from './components/Foo'
import Bar from './components/Bar'
import reducer from './reducers'


//const store = createStore(reducer)
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)



render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/foo" getComponent={
          (location, callback) => {
            require.ensure([],function(require){
              callback(null,require('./components/Foo').default);
            },'Foo');
          }
        }/>
        <Route path="/bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
