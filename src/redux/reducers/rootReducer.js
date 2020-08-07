import { combineReducers } from 'redux';
import customizer from './customizer';
import navbar from './navbar/Index';
import auth from '../_modules/auth/reducer';
import user from '../_modules/user/reducer';

const rootReducer = combineReducers({
  customizer,
  navbar,
  auth,
  user,
});

export default rootReducer;
