import { requestGetMedia } from "../requests/mediaAds";
import { call, put } from "redux-saga/effects";
import { loadMediaError, loadMediaSuccess } from "../../ducks/mediaAds";

export function* handleGetMedia() {
  try {
    const response = yield call(requestGetMedia);
    console.log("response", response);

    if (response.status === 200) {
      yield put(loadMediaSuccess(response?.data?.data));
    }
  } catch (error) {
    yield put(loadMediaError(error));
  }
}
