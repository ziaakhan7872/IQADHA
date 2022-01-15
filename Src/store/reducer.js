import {
  UPDATE_USER_REQUEST,
  FETCHING_USER_REQUEST,
  CREATE_SPORTS_LIST,
  UPDATE_PLANS_LIST,
  Clear_USER_REQUEST,
  UPDATE_FAQS_LIST,
  FETCHING_FAQS_REQUEST,
  UPDATE_USER_REGISTER_REQUEST,
  FETCHING_THEME,
  UPDATING_THEME,
  UPDATE_FAST,
  FETCH_UPDATED_FAST,
  SIGN_OUT,
} from "./actionsType";

const initialState = {
  user: [],
};
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { ...state, user: action.payload };
    case UPDATE_USER_REGISTER_REQUEST:
      return { ...state, userdata: action.payload };
    case FETCHING_USER_REQUEST:
      return { ...state, user: "" };
    case CREATE_SPORTS_LIST:
      return { ...state, sports: action.payload };
    case UPDATE_PLANS_LIST:
      return { ...state, plans: action.payload };
    case Clear_USER_REQUEST:
      return initialState;
    case UPDATE_FAQS_LIST:
      return { ...state, Faqs: action.payload };
    case FETCHING_FAQS_REQUEST:
      return { ...state, Faqs: state.Faqs };
    case FETCHING_THEME:
      return { ...state, Faqs: state.Faqs };
    case UPDATING_THEME:
      return { ...state, theme: action.payload };
    case FETCH_UPDATED_FAST:
      return { ...state, fast: state.Faqs };
    case UPDATE_FAST:
      return { ...state, fast: action.payload };
    case SIGN_OUT:
      return { ...state, user: [] };

    default:
      return state;
  }
};
