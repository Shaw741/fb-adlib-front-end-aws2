import { all, fork, takeLatest } from "redux-saga/effects";
import {  LOAD_MEDIA_START } from "../ducks/mediaAds";
import { handleGetMedia } from "./handlers/mediaAds";
import {
  handleGetAccountSettings,
  handleUpdateAccountSettings,
} from "./handlers/accountSettings";
import {
  handleCreateSavedAds,
  handleDeleteSavedAds,
  handleGetSavedAds,
} from "./handlers/savedAds";
import {
  LOAD_ACCOUNT_SETTINGS_START,
  UPDATE_ACCOUNT_SETTINGS_START,
} from "./../ducks/accountSettings";
import { LOAD_SUBALLMEDIA_START } from "../ducks/subAllAds";
import { handleGetSubAllMedia } from "./handlers/subAllAds";
import {  handleGetSearchedPhraseData } from "./handlers/searchBar";
import {  SEARCH_PHRASE_START } from "../ducks/filtered_Data";

import {  CREATE_SAVEADS_START, DELETE_SAVEADS_START, LOAD_SAVEADS_START } from "../ducks/saveAds_clientSide";
import { handleGetCatStatus } from "./handlers/allSastus";
import { handleGetIsAlive } from "./handlers/session";
import { handleGetSubscription } from "./handlers/subscription";
import { LOAD_ISALIVE_START } from "../ducks/session";
import { LOAD_SUBSCRIPTION_START } from "../ducks/subscription";

import { ALL_STATUS_START } from "../ducks/appliedFilterData";

function* onLoadMeida() {
  yield takeLatest(LOAD_MEDIA_START, handleGetMedia);
}

function* onLoadIsAlive() {
  yield takeLatest(LOAD_ISALIVE_START, handleGetIsAlive);
}

function* onLoadSubscription() {
  yield takeLatest(LOAD_SUBSCRIPTION_START, handleGetSubscription);
}

function* onLoadSavedAds() {
  yield takeLatest(LOAD_SAVEADS_START, handleGetSavedAds);
}

function* onCreateSavedAds() {
  yield takeLatest(CREATE_SAVEADS_START, handleCreateSavedAds);
}

function* onDeleteSavedAds() {
  yield takeLatest(DELETE_SAVEADS_START, handleDeleteSavedAds);
}

function* onGetAccountSettings() {
  yield takeLatest(LOAD_ACCOUNT_SETTINGS_START, handleGetAccountSettings);
}

function* onUpdateAccountSettings() {
  yield takeLatest(UPDATE_ACCOUNT_SETTINGS_START, handleUpdateAccountSettings);
}

function* onLoadSubAllMeida() {
  yield takeLatest(LOAD_SUBALLMEDIA_START, handleGetSubAllMedia);
}

function* onLoadAllCatSatus() {
  yield takeLatest(ALL_STATUS_START, handleGetCatStatus);
}

// function* onLoadSearchedAds() {
//   yield takeLatest(SEARCH_START, handleGetSearchedPhraseData);
// }

// function* onLoadPhraseSearchedAds() {
//   yield takeLatest(SEARCH_PHRASE_START, handleGetSearchedPhraseData);
// }

// function* onLoadSavedAdSearchedAds() {
//   yield takeLatest(ALL_SAVED_ADS_SEARCH_START, handleGetSavedAdsSearchedData);
// }
// function* onLoadSavedAdSearchedPhhraseAds() {
//   yield takeLatest(SAVED_SEARCH_PHRASE_START, handleGetSavedSearchedPhraseData);
// }
const mediaSagas = [fork(onLoadMeida)];
const isAliveSagas = [fork(onLoadIsAlive)];

const subscriptionSagas = [fork(onLoadSubscription)];

const SavedAdSearchSagas = [//fork(onLoadSavedAdSearchedAds),
  //fork(onLoadSavedAdSearchedPhhraseAds)
];

const savedAdsSagas = [
  fork(onLoadSavedAds),
  fork(onCreateSavedAds),
  fork(onDeleteSavedAds),
];

const accountSettingsSagas = [
  fork(onGetAccountSettings),
  fork(onUpdateAccountSettings),
];

const suballadsSagas = [fork(onLoadSubAllMeida)];

const searchedAdsSagas = [
  // fork(onLoadSearchedAds),
  //  fork(onLoadPhraseSearchedAds)

];
const allCatStatusSagas = [
  fork(onLoadAllCatSatus
    ),

];
export default function* watcherSaga() {
  yield all([
    ...mediaSagas,
    ...savedAdsSagas,
    ...accountSettingsSagas,
    ...suballadsSagas,
    ...searchedAdsSagas,
    ...SavedAdSearchSagas,
    ...allCatStatusSagas,
    ...isAliveSagas,
    ...subscriptionSagas
  ]);
}
