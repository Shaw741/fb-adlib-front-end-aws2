export const LOAD_SAVEADS_START = "LOAD_SAVEADS_START";
export const LOAD_SAVEADS_SUCCESS = "LOAD_SAVEADS_SUCCESS";
export const LOAD_SAVEADS_ERROR = "LOAD_SAVEADS_ERROR";

export const CREATE_SAVEADS_START = "CREATE_SAVEADS_START";
export const CREATE_SAVEADS_SUCCESS = "CREATE_SAVEADS_SUCCESS";
export const CREATE_SAVEADS_ERROR = "CREATE_SAVEADS_ERROR";

export const DELETE_SAVEADS_START = "DELETE_SAVEADS_START";
export const DELETE_SAVEADS_SUCCESS = "DELETE_SAVEADS_SUCCESS";
export const DELETE_SAVEADS_ERROR = "DELETE_SAVEADS_ERROR";

export const loadSavedAdsStart = () => ({
  type: LOAD_SAVEADS_START,
});

export const loadSavedAdsSuccess = (savedMediaAds) => ({
  type: LOAD_SAVEADS_SUCCESS,
  payload: savedMediaAds,
});

export const loadSavedAdsError = (error) => ({
  type: LOAD_SAVEADS_ERROR,
  payload: error,
});

export const createSavedAdsStart = (addAd) => ({
  type: CREATE_SAVEADS_START,
  payload: addAd,
});

export const createSavedAdsSuccess = (addAd) => ({
  type: CREATE_SAVEADS_SUCCESS,
  payload: addAd,
});

export const createSavedAdsError = (error) => ({
  type: CREATE_SAVEADS_ERROR,
  payload: error,
});

export const deleteSavedAdsStart = (saveId) => ({
  type: DELETE_SAVEADS_START,
  payload: saveId,
});

export const deleteSavedAdsSuccess = (saveId) => ({
  type: DELETE_SAVEADS_SUCCESS,
  payload: saveId,
});

export const deleteSavedAdsError = (error) => ({
  type: DELETE_SAVEADS_ERROR,
  payload: error,
});

const initialState = {
  savedAds: [],  
  loading: false,
  error: "",
};

const savedAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SAVEADS_START:
    case CREATE_SAVEADS_START:
    case DELETE_SAVEADS_START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SAVEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        savedAds: action.payload,        
      };
    case CREATE_SAVEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        savedAds: [...state.savedAds.concat(action.payload)],        
      };
    case LOAD_SAVEADS_ERROR:
    case CREATE_SAVEADS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_SAVEADS_SUCCESS: {
        return {
          ...state,
          loading: false,
          savedAds: state.savedAds.filter((savedads) => savedads.adID !== action.payload.deleted_id),
        };
      }
    default:
      return state;
  }
};

export default savedAdsReducer;
