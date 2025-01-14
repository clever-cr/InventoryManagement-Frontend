import { myAuth } from "./index";

import {
  loginService,
  registerService,
} from "./services";
export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myAuth.setIsFetching(true));
      const res = await loginService(data);
      console.log("RESSSS:", res)
      if (res?.status === "success") {
        dispatch(myAuth.setUser(res));
        localStorage.setItem("user",JSON.stringify(res));
      
        dispatch(myAuth.setIsFetching(false));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myAuth.setIsFetching(true));
      const res = await registerService(data);
      console.log("RESSSS:", res)
      if (res?.status === "success") {
        dispatch(myAuth.setUser(res));
        dispatch(myAuth.setIsFetching(false));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};
