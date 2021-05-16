import { combineReducers } from 'redux';
import { createReducer } from "@reduxjs/toolkit";

import actions from './contact-actions';

const { fetchContactSuccess, addContactSuccess, deleteContactSuccess } = actions;

const items = createReducer([], {
  [fetchContactSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [actions.filter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});