import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from './reducers/index';
const finalCreateStore = applyMiddleware(thunk)(createStore);
export default finalCreateStore(index);