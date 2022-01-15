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

export const update_user_request = (data) => ({
  type: UPDATE_USER_REQUEST,
  payload: data,
});
export const update_user_register_request = (data) => ({
  type: UPDATE_USER_REGISTER_REQUEST,
  payload: data,
});
export const clear_user_request = (data) => ({
  type: Clear_USER_REQUEST,
  payload: data,
});

export const fetching_user_request = () => ({
  type: FETCHING_USER_REQUEST,
});
export const fetching_faqs_request = () => ({
  type: FETCHING_FAQS_REQUEST,
});

export const update_sports_list = (data) => ({
  type: CREATE_SPORTS_LIST,
  payload: data,
});
export const update_faqs_list = (data) => ({
  type: UPDATE_FAQS_LIST,
  payload: data,
});
export const update_plans_list = (data) => ({
  type: UPDATE_PLANS_LIST,
  payload: data,
});
export const update_theme = (data) => ({
  type: UPDATING_THEME,
  payload: data,
});
export const fetching_theme = () => ({
  type: FETCHING_THEME,
});

export const fetching_fast = () => ({
  type: FETCH_UPDATED_FAST,
});
export const update_fast = (data) => ({
  type: UPDATE_FAST,
  payload: data,
});
export const signOut = () => ({
  type: SIGN_OUT,
});
