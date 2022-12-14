export const LOAD_SINGLEAD_START = "LOAD_SINGLEAD_START";
export const LOAD_SINGLEAD_SUCCESS = "LOAD_SINGLEAD_SUCCESS";
export const LOAD_SINGLEAD_ERROR = "LOAD_SINGLEAD_ERROR";

export const CLEAR_SINGLEAD = "CLEAR_SINGLEAD";

export const loadSingleAdDataStart = (subAdsInfo) => ({
  type: LOAD_SINGLEAD_START,
  payload: subAdsInfo,
});

export const loadSingleAdDataSuccess = (subAllAds) => ({
  type: LOAD_SINGLEAD_SUCCESS,
  payload: subAllAds,
});

export const loadSingleAdDataError = (error) => ({
  type: LOAD_SINGLEAD_ERROR,
  payload: error,
});

export const loadSingleAdDataClear = () => ({
  type: CLEAR_SINGLEAD,
});
const initialState = {
  singleAdData: [],
  loading: false,
  error: "",
};

const singleAdDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SINGLEAD_START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SINGLEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdData: action.payload,
      };

    case LOAD_SINGLEAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SINGLEAD:
      return {
        ...state,
        singleAdData: [],
      };
    default:
      return state;
  }
};

export default singleAdDataReducer;
