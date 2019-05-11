/* eslint-disable indent */
import {
  GET_EVENT,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  CREATE_EVENT,
  GET_EVENT_HISTORY,
  CHANGE_EVENT_ID,
  UPDATE_SEARCH_SUGGESTIONS,
  SEARCH_OVERLAY
} from '../types/DashBoardTypes';
import { events, past } from './mock';

const initialState = {
  selectedEventId: null,
  events: events,
  searchSuggestions: null,
  isLoading: false,
  responseMsg: null,
  pastEvents: past,
  searchOverlay: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
      return {
        ...state,
        isLoading: true
      };
    case GET_EVENT_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        isLoading: false,
        events: action.payload.data
      };
    case CREATE_EVENT:
      return {
        ...state,
        responseMsg: action.payload.data
      };
    case GET_EVENT_HISTORY:
      return {
        ...state,
        pastEvents: action.payload.data
      };
    case CHANGE_EVENT_ID:
      return {
        ...state,
        selectedEventId: action.payload
      };
    case UPDATE_SEARCH_SUGGESTIONS:
      return {
        ...state,
        searchSuggestions: action.payload
      };
    case SEARCH_OVERLAY:
      return {
        ...state,
        searchOverlay: action.payload
      };

    default:
      return state;
  }
}
