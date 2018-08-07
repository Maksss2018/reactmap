import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index';

 
 const store = createStore(reducers, applyMiddleware(thunk));
 
ReactDOM.render(
    <Provider store={store} >
    <Router>
     <Route path="/" component={App}/>
    </Router>
    </Provider>,
    document.getElementById('root')
    );
registerServiceWorker();
