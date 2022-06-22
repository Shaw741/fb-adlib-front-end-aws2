import { call, put } from 'redux-saga/effects';
import { requestCreateSavedAds, requestDeleteSavedAds, requestGetSavedAds } from "../requests/savedAds";
import { createSavedAdsError, createSavedAdsSuccess, deleteSavedAdsError, deleteSavedAdsSuccess, loadSavedAdsError, loadSavedAdsSuccess } from "../../ducks/saveAds";

export function* handleGetSavedAds() {
	try {
		const response = yield call(requestGetSavedAds);
		console.log("response",response)		

		if (response.status === 200) {
			yield put(loadSavedAdsSuccess(response?.data?.data));
		}
	} catch (error) {
		yield put(loadSavedAdsError(error));
	}
}



export function* handleCreateSavedAds({ payload }) {
	try {
		const response = yield call(requestCreateSavedAds, payload);

		if (response.status === 200) {
			yield put(createSavedAdsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createSavedAdsError(error));
	}
}

export function* handleDeleteSavedAds({ payload }) {
	try {
		const response = yield call(requestDeleteSavedAds, payload);

		if (response.status === 200) {
			yield put(deleteSavedAdsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteSavedAdsError(error));
	}
}
