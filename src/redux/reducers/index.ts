import { combineReducers } from 'redux';
import investments from './investments';

const reducer = combineReducers({
  investments,
});

export default reducer;
