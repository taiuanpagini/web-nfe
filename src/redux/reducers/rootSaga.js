import { all } from 'redux-saga/effects';
import auth from '../_modules/auth/sagas';
import user from '../_modules/user/sagas';

export default function* rootSaga() {
  return yield all([auth, user]);
}
