import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import mediaReducer from "./ducks/mediaAds";
import watcherSaga from "./sagas/rootSaga";
// import savedAdsReducer from "./ducks/saveAds";
import accountSettingsReducer from "./ducks/accountSettings";
import subAllMediaReducer from "./ducks/subAllAds";
import savedAdsClienSideReducer from "./ducks/saveAds_clientSide";
import FilterDataReducer from "./ducks/filtered_Data";
import isAliveReducer from "./ducks/session";
import subscriptionReducer from "./ducks/subscription";
import filterReducer from "./ducks/appliedFilterData";
import saveFilterReducer from "./ducks/saveAppliedFilters";
// import filterReducer from "./ducks/filterData";

const reducer = combineReducers({
  allMediaAds: mediaReducer,
  // savedAds: savedAdsReducer,
  accountSettings: accountSettingsReducer,
  subAllMedia: subAllMediaReducer,
  savedclienads: savedAdsClienSideReducer,
  // filteredData: FilterDataReducer,
  isAliveData: isAliveReducer,
  subscriptionData: subscriptionReducer,
  appliedFilterData:filterReducer,
  saveFilterData:saveFilterReducer,
});

const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleWares = createSagaMiddleware();
const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleWares))
);
// const store = createStore(reducer, applyMiddleware(...middleWares));

sagaMiddleWares.run(watcherSaga);

export default store;
