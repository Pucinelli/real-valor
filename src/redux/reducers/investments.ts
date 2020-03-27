import {
  InvestmentsActions,
  InvestmentsActionTypes,
} from '../../_settings/types/actions/investments';
import defaultValues from '../store/defaultValues';
import { Store } from '../../_settings/types/store';

const reducer = (
  state: Store['investments'] = defaultValues.investments,
  action: InvestmentsActions
) => {
  switch (action.type) {
    case InvestmentsActionTypes.INVESTMENTS_FETCH_REQUEST:
      return { ...state };
    case InvestmentsActionTypes.INVESTMENTS_FETCH_SUCCESS:
      return { ...state, ...action.payload };
    case InvestmentsActionTypes.INVESTMENTS_FETCH_FAILURE:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
