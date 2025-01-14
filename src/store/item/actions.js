import { message, notification } from "antd";
import { myItem } from "./index";

import {
  addItemService,
  getAllItemsService,
  sellItemService,
  getLowStockService, 
  getItemsSoldService
} from "./services";
export const addItemAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myItem.setIsFetching(true));
      const res = await addItemService(data);
      console.log("RESSSS:", res)
      if(res.status === "success"){
        dispatch(myItem.setselected(res))
        dispatch(myItem.setIsFetching(false))
        return true
      }
      dispatch(myItem.setIsFetching(false))
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};

export const sellItemAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myItem.setIsFetching(true));
      const res = await sellItemService(data);
      console.log("RESSSS:", res)
      if (res?.status === "success") {
        // dispatch(myItem.setAll(res));
        dispatch(myItem.setIsFetching(false));
        return {type:true,response:res};
      } else if(res?.status === "error"){
        notification.error({message:res.message})
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};


export const getAllItemsAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myItem.setIsFetching(true));
      const res = await getAllItemsService(data);
      console.log("RESSSS:", res)
      if (res) {
        dispatch(myItem.setAll(res));
        dispatch(myItem.setIsFetching(false));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLowStock = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myItem.setIsFetching(true));
      const res = await getLowStockService(data);
      console.log("RESSSS:", res)
      if (res) {
        dispatch(myItem.setNotification(res));
        dispatch(myItem.setIsFetching(false));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};

export const getItemsSold = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myItem.setIsFetching(true));
      const res = await getItemsSoldService(data);
      console.log("RESSSS:", res)
      if (res) {
        dispatch(myItem.setSoldItems(res));
        dispatch(myItem.setIsFetching(false));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
};