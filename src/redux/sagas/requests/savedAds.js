import axiosInstance from "./../../../axios/Index";

export function requestGetSavedAds() {
  return axiosInstance.get("api/saveadmanager/", { withCredentials: true });
}

export function requestCreateSavedAds(SavedAds) {
  console.log("????????????????????????????????++++++++++++++++++++++===================")
  console.log(SavedAds)
  return axiosInstance.post("api/saveadmanager/", SavedAds, {
    withCredentials: true,
  });
}

export function requestDeleteSavedAds(id) {
  console.log(id.deleted_id);
  return axiosInstance.delete(`api/saveadmanager/${Number(id.deleted_id)}/`, {
    withCredentials: true,
  });
}
