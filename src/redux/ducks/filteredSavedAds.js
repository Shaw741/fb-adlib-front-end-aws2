export const LOAD_SAVED_FILTERED_ADS_START = "LOAD_SAVED_FILTERED_ADS_START";
export const LOAD_SAVED_FILTERED_ADS_SUCCESS =
  "LOAD_SAVED_FILTERED_ADS_SUCCESS";
export const LOAD_SAVED_FILTERED_ADS_ERROR = "LOAD_SAVED_FILTERED_ADS_ERROR";

export const LOAD_MORE_SAVED_FILTERED_ADS_START =
  "LOAD_MORE_SAVED_FILTERED_ADS_START";
export const LOAD_MORE_SAVED_FILTERED_ADS_SUCCESS =
  "LOAD_MORE_SAVED_FILTERED_ADS_SUCCESS";
export const LOAD_MORE_SAVED_FILTERED_ADS_ERROR =
  "LOAD_MORE_SAVED_FILTERED_ADS_ERROR";

export const REMOVE_SAVED_FILTERED_AD = "REMOVE_SAVED_FILTERED_AD";
export const ADD_TO_SAVED_FILTERED_AD_LOCAL_START =
  "ADD_TO_SAVED_FILTERED_AD_LOCAL_START";
export const ADD_TO_SAVED_FILTERED_AD_LOCAL_SUCCESS =
  "ADD_TO_SAVED_FILTERED_AD_LOCAL_SUCCESS";
export const ADD_TO_SAVED_FILTERED_AD_LOCAL_ERROR =
  "ADD_TO_SAVED_FILTERED_AD_LOCAL_ERROR";

  export const SAVED_GET_PAGE_POSITION = "SAVED_GET_PAGE_POSITION";

  export const SET_CURRENT_PAGINATION_INDEX = "SET_CURRENT_PAGINATION_INDEX";
  export const SET_PAGINATION_SAVED_ADS = "SET_PAGINATION_SAVED_ADS";

export const addToSavedAdsFilterLocalStart = (adToBeAdded) => ({
  type: ADD_TO_SAVED_FILTERED_AD_LOCAL_START,
  payload: adToBeAdded,
});//done

export const addToSavedAdsFilterLocalSuccess = (adToBeAdded) => ({
  type: ADD_TO_SAVED_FILTERED_AD_LOCAL_SUCCESS,
  payload: adToBeAdded,
});//done

export const addToSavedAdsFilterLocalError = (error) => ({
  type: ADD_TO_SAVED_FILTERED_AD_LOCAL_ERROR,
  payload: error,
});

export const removesavedFilteredAdLocal = (adToBeRemoved) => ({
  type: REMOVE_SAVED_FILTERED_AD,
  payload: adToBeRemoved,
});//done

export const loadsavedFilteredAdsStart = (request) => ({
  type: LOAD_SAVED_FILTERED_ADS_START,
  payload: request,
});//done

export const loadsavedFilteredAdsSuccess = (filteredSavedAds) => ({
  type: LOAD_SAVED_FILTERED_ADS_SUCCESS,
  payload: filteredSavedAds,
});//done

export const loadsavedFilteredAdsError = (error) => ({
  type: LOAD_SAVED_FILTERED_ADS_ERROR,
  payload: error,
});//done

export const loadMoresavedFilteredAdsStart = (request) => ({
  type: LOAD_MORE_SAVED_FILTERED_ADS_START,
  payload: request,
});//done

export const loadMoresavedFilteredAdsSuccess = (filteredSavedAds) => ({
  type: LOAD_MORE_SAVED_FILTERED_ADS_SUCCESS,
  payload: filteredSavedAds,
});//done

export const loadMoresavedFilteredAdsError = (error) => ({
  type: LOAD_MORE_SAVED_FILTERED_ADS_ERROR,
  payload: error,
});
export const setPostionForSavedPageToScrollValueStart = (error) => ({
  type: SAVED_GET_PAGE_POSITION,
  payload: error,
});

export const setSavedCurrentPaginationIndex = (page) => ({
  type: SET_CURRENT_PAGINATION_INDEX,  
  payload:page,
});

export const setSavedCurrentPaginationAds = (page) => ({
  type: SET_PAGINATION_SAVED_ADS,  
  payload:page,
});


const initialState = {
  filteredSavedAds: [],
  savedAdsIds: [], 
  SavedCurrentPage:[],
  SavedCurrentPageStartPoint:0,
  SavedCurrentPageEndPoint:4, 
  totalPages:0,
  paginationIndex:1,
  hasMoreData:true,
  postionOfPage:0,
  loading: false,
  error: "",
};

const filteredSavedAdsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_SAVED_FILTERED_ADS_START:
      return {
        ...state,
        filteredSavedAds: [],
        SavedCurrentPage: [],
        savedAdsIds:[],        
        loading: true,   
        hasMoreData:true,   
      };
    case LOAD_MORE_SAVED_FILTERED_ADS_START:
      return {
        ...state,
        loading: true,        
      };

    case LOAD_SAVED_FILTERED_ADS_SUCCESS:
      console.log("101",action.payload.data.all_ads)
      console.log("101 first time",action.payload.data.all_ads.slice(state.SavedCurrentPageStartPoint,state.SavedCurrentPageEndPoint))
      return {
        ...state,
        loading: false,
        // filteredSavedAds:action.payload?.error === true ? [] : action.payload?.data.all_ads,
        filteredSavedAds:action.payload?.data.all_ads,
        totalPages:Math.ceil(action.payload.data.total_ads/4),
        hasMoreData:action.payload?.data?.length < 8 ? false : true,
        SavedCurrentPage:action.payload.data.all_ads.slice(state.SavedCurrentPageStartPoint,state.SavedCurrentPageEndPoint),
      };

    case LOAD_MORE_SAVED_FILTERED_ADS_SUCCESS:
      return {
        ...state,
        loading: false, 
        filteredSavedAds: action.payload?.error === true ? state.filteredSavedAds : [...state.filteredSavedAds].concat(action.payload?.data.all_ads),      
        totalPages:action.payload.data.total_pages,
        hasMoreData:action.payload?.length < 8 ? false : true,
      };

    case LOAD_SAVED_FILTERED_ADS_ERROR:
    case LOAD_MORE_SAVED_FILTERED_ADS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.data?.error,
      };
      case SET_CURRENT_PAGINATION_INDEX:
        return {
          ...state,
          paginationIndex:action.payload
        };
    case REMOVE_SAVED_FILTERED_AD:
      return {
        ...state,
        filteredSavedAds: state.filteredSavedAds.filter(function (ad) {
          return ad.id !== action.payload?.id;
        }),
      };

    case ADD_TO_SAVED_FILTERED_AD_LOCAL_SUCCESS:
      const filterdListToBeUpdated = [...state.filteredSavedAds]
      filterdListToBeUpdated.unshift(action.payload?.AdDetails)
      return {
        ...state,
        filteredSavedAds: action.payload?.valid
          ? filterdListToBeUpdated
          : state.filteredSavedAds,
      };
      case SAVED_GET_PAGE_POSITION:
        return {
          ...state,
          // [`${action.payload.key}`]:action.payload.data,
          postionOfPage:action.payload
        }
        case SET_PAGINATION_SAVED_ADS:
          console.log("101 in redux ",state.filteredSavedAds.slice(action.payload.start,action.payload.end))
          return {
            ...state,
            SavedCurrentPage:state.filteredSavedAds.slice(action.payload.start,action.payload.end),
            SavedCurrentPageStartPoint:action.payload.start,
            SavedCurrentPageEndPoint:action.payload.end,
            paginationIndex:action.payload.currentPage,
            // totalPages:Math.ceil(state.filteredSavedAds.length/4)
          };
    default:
      return state;
  }
};

export default filteredSavedAdsReducer;
