import axios from "axios";
import axiosInstance from "../axios/Index";
import appConfig from "../config/index";

export const usermanager = async (payload) => {
  let result = {};
  try {
    const res = await axiosInstance.post(`api/usermanager/`, payload, {
      withCredentials: true,
    });
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const login = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(`${appConfig.appUrl}/api/login/`, payload, {
      withCredentials: true,
    });
    result = res.data || {};
    localStorage.setItem("is_alive", true);
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};
export const logoutUser = async () => {
  let result = {};
  try {
    const res = await axios.get(`${appConfig.appUrl}/api/logout/`, {
      withCredentials: true,
    });
    result = res.data || {};
    localStorage.setItem("is_alive", false);
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const isAlive = async () => {
  let result = {};
  try {
    const res = await axios.get(`${appConfig.appUrl}/api/isalive/`, {
      withCredentials: "true",
    });
    result = res.data || {};
    console.log("--------------------------result", result);
    localStorage.setItem("is_alive", res.data.data.is_alive);
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const forgotPassword = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/api/forgot_password/`,
      payload,
      { withCredentials: true }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const changePassword = async (payload) => {
  let result = {};
  try {
    const userid = await axios.get(
      `http://localhost:8000/api/usermanager/`,
      { withCredentials: true }
    );
    console.log(userid.data.data);
    const res = await axios.put(
      `http://localhost:8000/api/usermanager/${userid?.data?.data?.id}/`, 
      payload,
      { withCredentials: true }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const getName =async()=>{
  let result = {};
  try {
    const res = await axios.get(
      `http://localhost:8000/api/usermanager/`, 
      { withCredentials: true }
    );
    result = res.data.data || {};
    console.log(result)
    return { success: true, data: result };
  }catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
}

export const changeName = async (payload) => {
  let result = {};
  try {
    const userid = await axios.get(
      `http://localhost:8000/api/usermanager/`, 
      { withCredentials: true }
    );
    console.log(userid.data.data);
    console.log("---------------- payload",payload)
    console.log(payload);
    const res = await axios.put(
      `http://localhost:8000/api/usermanager/${userid?.data?.data?.id}/`, 
      payload,
      { withCredentials: true }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const contactSupport = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(`${appConfig.appUrl}/api/support/`, payload, {
      withCredentials: true,
    });
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};
