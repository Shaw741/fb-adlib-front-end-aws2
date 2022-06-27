export const LOAD_SAVEADSCLIENTSIDE_START = "LOAD_SAVEADSCLIENTSIDE_START";

export const CREATE_SAVEADSCLIENTSIDE_START = "CREATE_SAVEADSCLIENTSIDE_START";

export const DELETE_SAVEADSCLIENTSIDE_START = "DELETE_SAVEADSCLIENTSIDE_START";

export const loadSavedAdsClientSideStart = (allData) => ({
  type: LOAD_SAVEADSCLIENTSIDE_START,
  payload: allData,
});

export const createSavedAdsClientSideStart = (ads) => ({
  type: CREATE_SAVEADSCLIENTSIDE_START,
  payload: ads,
});

export const deleteSavedAdsClientSideStart = (ads) => ({
  type: DELETE_SAVEADSCLIENTSIDE_START,
  payload: ads,
});

const initialState = {
  savedAdsLocal: [],
  savedIds: [],
  loading: false,
  error: "",
};

const savedAdsClienSideReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SAVEADSCLIENTSIDE_START:
      return {
        ...state,
        loading: false,
        savedAdsLocal: action.payload,
        savedIds: action.payload.map((abc) => abc.adID),
      };
    case CREATE_SAVEADSCLIENTSIDE_START:
      return {
        ...state,
        loading: false,
        savedAdsLocal: [...state.savedAdsLocal.concat(action.payload)],
        savedIds: [...state.savedIds.concat(action.payload)],
      };
    case DELETE_SAVEADSCLIENTSIDE_START:
      return {
        ...state,
        loading: false,
        savedAdsLocal: state.savedAdsLocal.filter(
          (savedads) => savedads.adID !== action.payload.adID
        ),
        savedIds: state.savedIds.filter(
          (savedads) => savedads !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default savedAdsClienSideReducer;
