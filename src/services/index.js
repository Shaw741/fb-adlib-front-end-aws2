import axios from "axios";
import appConfig from "../config/index";
import * as Yup from 'yup';
export const signUp = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/api/usermanager/`,
      payload,
      {
        withCredentials: true,
      }
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

export const login = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(`${appConfig.appUrl}/api/login/`, payload, {
      withCredentials: true,
    });
    result = res.data || {};
    localStorage.setItem("is_alive", true);
    return { success: true, data: result, message: null };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
      data: null,
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
    return { success: true, data: result, message: null };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
      data: null,
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
    localStorage.setItem("is_alive", res.data.data.is_alive);
    return { success: true, data: result, message: null };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
      data: null,
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
    return { success: true, data: result, message: null };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};

export const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Enter your firstname'),
  lastname: Yup.string()
    .required('Username is required'),
  //   .min(6, 'Username must be at least 6 characters')
  //   .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});

export const loginvalidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

export const forgetvalidationSchema = Yup.object().shape({

  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),

});

export const changePassword = async (payload) => {
  let result = {};
  try {
    const userid = await axios.get(
      `http://localhost:8000/api/usermanager/`, //http://127.0.0.1:8000/api/usermanager/      
      { withCredentials: true }
    );
    console.log(userid.data.data);
    console.log("---------------- payload", payload)
    // console.log(payload);
    const res = await axios.put(
      `http://localhost:8000/api/usermanager/${userid?.data?.data?.id}/`, //http://127.0.0.1:8000/api/usermanager/
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

export const getName = async () => {
  let result = {};
  try {
    const res = await axios.get(
      `http://localhost:8000/api/usermanager/`, //http://127.0.0.1:8000/api/usermanager/      
      { withCredentials: true }
    );
    result = res.data.data || {};   
    return { success: true, data: result };
  } catch (err) {
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
      `http://localhost:8000/api/usermanager/`, //http://127.0.0.1:8000/api/usermanager/      
      { withCredentials: true }
    );
    console.log(userid.data.data);
    console.log("---------------- payload", payload)
    console.log(payload);
    const res = await axios.put(
      `http://localhost:8000/api/usermanager/${userid?.data?.data?.id}/`, //http://127.0.0.1:8000/api/usermanager/
      payload,
      { withCredentials: true }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
      data: null,
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
    return { success: true, data: result, message: null };
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
      data: null,
    };
  }
};

export const getCarddetails = async () => {
  try {
    const res = await axios.get(
      `${appConfig.appUrl}/api/fetch_payment_method`,
      { withCredentials: 'true' }
    );
    return res.data.data
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
}

export const monthsubscription = async () => {
  try {
    await axios.post("http://localhost:8000/api/create_checkout_session/", { lookup_key: "price_1LJcHhSDUd5CnxuZJVxj4oP9" }, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      withCredentials: true

    }).then((res) => window.open(res.data.data.url))
      .catch((error) => console.log(error))
  }
  catch {
    console.log("error")
  }
}

export const yearsubcription = async () => {
  try {
    await axios.post("http://localhost:8000/api/create_checkout_session/", { lookup_key: "price_1LJcHhSDUd5CnxuZH9jfkvwr" }, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      withCredentials: true
    }).then((res) => window.open(res.data.data.url, "_self"))
      .catch((error) => console.log(error))
  }
  catch {
    console.log("error")
  }
}
export const cancelusersubcription = async () => {
  try {
    const res = await axios.get(
      `${appConfig.appUrl}/api/cancel_subscription`,
      { withCredentials: 'true' }
    );
    return res
  } catch (err) {
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
}