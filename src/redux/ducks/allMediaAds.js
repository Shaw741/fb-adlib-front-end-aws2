// export const LOAD_MEDIA_START = "LOAD_MEDIA_START";
// export const LOAD_MEDIA_SUCCESS = "LOAD_MEDIA_SUCCESS";
// export const LOAD_MEDIA_ERROR = "LOAD_MEDIA_ERROR";

// export const UPDATE_MEDIA_START = "UPDATE_MEDIA_START";
// export const UPDATE_MEDIA_SUCCESS = "UPDATE_MEDIA_SUCCESS";
// export const UPDATE_MEDIA_ERROR = "UPDATE_MEDIA_ERROR";

// export const loadMediaStart = (allMediaAds) => ({
//   type: LOAD_MEDIA_START,
//   payload:allMediaAds,
// });

// export const loadMediaSuccess = (allMediaAds) => ({
//   type: LOAD_MEDIA_SUCCESS,
//   payload: allMediaAds,
// });

// export const loadMediaError = (error) => ({
//   type: LOAD_MEDIA_ERROR,
//   payload: error,
// });

// export const updateMediaStart = (updatead) => ({
//   type: UPDATE_MEDIA_START,
//   payload: updatead,
// });

// export const updateMediaSuccess = (updatead) => ({
//   type: UPDATE_MEDIA_SUCCESS,
//   payload: updatead,
// });

// export const updateMediaError = (error) => ({
//   type: UPDATE_MEDIA_ERROR,
//   payload: error,
// });

// const initialState = {
//   allMediaAds: [],
//   savedIds:[],
//   page_index:0,
//   loading: false,
//   error: "",
// };
// const mediaReducer = (state = initialState, action) => {
// console.log("555555555555555",action.payload)

//   // console.log(action?.payload?.adID);
//   // console.log(allMediaAds[0].adID);
//   // console.log("88888888888888888888888888888888888888888");
//   switch (action.type) {
//     case LOAD_MEDIA_START:
//       console.log("11111--------",action.payload.initialState)
//       return {
//         ...state,
//         // initialState:action.payload, 
//         loading: true,
//         // page_index:action.payload.page_index+1,
//         // initialState: [...state.action.payload, ...action.allMediaAds],
//       };
                                                                        
//     case UPDATE_MEDIA_START:
//       return {
//         ...state,
//         loading: true,
//       };
//     case LOAD_MEDIA_SUCCESS:
//         // const updateData = [...state.allMediaAds,action.payload]
//       console.log(":::::1111111111111111111111111111111111111111111111111111111111111111111111111111111111",action.payload)
//       return {
//         ...state,
//         loading: false,
//         allMediaAds: action.payload[1]?.all_ads,
//         savedIds:action.payload.saved_ads
//       };
//     case UPDATE_MEDIA_SUCCESS:
//       const index = state.allMediaAds.findIndex(
//         (ads) => ads.adID === action.payload.adID 
//       );

//       const newArray = [...state.allMediaAds];

//       newArray[index] = action.payload;

//       return {
//         ...state,
//         loading: false,
//         allMediaAds: newArray,
//       };
//     case LOAD_MEDIA_ERROR:
//     case UPDATE_MEDIA_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,

//       };
//     default:
//       return state;
//   }
// };

// export default mediaReducer;
