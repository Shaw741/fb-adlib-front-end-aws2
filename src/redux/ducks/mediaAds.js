export const LOAD_MEDIA_START = "LOAD_MEDIA_START";
export const LOAD_MEDIA_SUCCESS = "LOAD_MEDIA_SUCCESS";
export const LOAD_MEDIA_ERROR = "LOAD_MEDIA_ERROR";

export const UPDATE_MEDIA_START = "UPDATE_MEDIA_START";
export const UPDATE_MEDIA_SUCCESS = "UPDATE_MEDIA_SUCCESS";
export const UPDATE_MEDIA_ERROR = "UPDATE_MEDIA_ERROR";

export const SET_POSTION_SCROLL = "SET_POSTION_SCROLL";


export const loadMediaStart = (allMediaAds) => ({
  type: LOAD_MEDIA_START,
  payload: allMediaAds,
});

export const loadMediaSuccess = (allMediaAds) => ({
  type: LOAD_MEDIA_SUCCESS,
  payload: allMediaAds,
});

export const loadMediaError = (error) => ({
  type: LOAD_MEDIA_ERROR,
  payload: error,
});

export const updateMediaStart = (updatead) => ({
  type: UPDATE_MEDIA_START,
  payload: updatead,
});

export const updateMediaSuccess = (updatead) => ({
  type: UPDATE_MEDIA_SUCCESS,
  payload: updatead,
});

export const updateMediaError = (error) => ({
  type: UPDATE_MEDIA_ERROR,
  payload: error,
});

export const srtPostionForScrollValueStart = (filter) => ({
  type: SET_POSTION_SCROLL,
  payload: filter,
});

const initialState = {
  allAds: [],
  allMediaAds: [],
  allMediaAdsData: [],
  endOfData: false,
  savedIds: [],
  page_index: 0,
  loading: false,
  error: "",
  postionYoffset: 0,
  // searchBarData: "",
  // searchType: "All these words",
  // seactBarFilterData: [],
  // search_loading: false,
  // ctaStatus: [],
  // error: "",
};
const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MEDIA_START:      
      return {
        ...state,        
        loading: true,
        page_index: action.payload.page_index,
        // allMediaAds:state.allMediaAdsData,
        // allMediaAdsData:
        //   action.payload.page_index === 0 ? [] : state.allMediaAdsData,
        
      };

    case UPDATE_MEDIA_START:
      return {
        ...state,
        loading: false,
      };
    case LOAD_MEDIA_SUCCESS:     
      return {
        ...state,
        loading: false,
        allMediaAdsData:
          action.payload.error === false
            ? state.page_index===0?action.payload.data[1]?.all_ads: state.allMediaAdsData.concat(action.payload.data[1]?.all_ads)
            : state.allMediaAdsData,
        savedIds:
          action.payload.error === false
            ? state.savedIds.concat(action.payload.saved_ads)
            : state.savedIds,
      };
    case UPDATE_MEDIA_SUCCESS:
      const index = state.allMediaAds.findIndex(
        (ads) => ads.adID === action.payload.adID
      );

      const newArray = [...state.allMediaAds];

      newArray[index] = action.payload;

      return {
        ...state,
        loading: false,
        allMediaAds: newArray,
      };
    case LOAD_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        page_index: state.page_index - 1,
      };
    case UPDATE_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case SET_POSTION_SCROLL:
        return {
          ...state,
  
          filteredData: state.filteredData,
          appliedFilters: state.appliedFilters,
          postionYoffset: action.payload,
        };
    default:
      return state;
  }
};

export default mediaReducer;

