import HttpRequest from "../../utils/HttpRequest";

export const addItemService = async (data) => {
  return HttpRequest.post(`/api/addItem`, data, null);
};

export const sellItemService = async (data) => {
  return HttpRequest.post(`/api/sellItem`, data, null );
};

export const getAllItemsService = async () => {
  return HttpRequest.get(`/api/items`, null);
};


export const getLowStockService = async () => {
  return HttpRequest.get(`api/low-stock`, null);
};
export const getItemsSoldService = async () => {
  return HttpRequest.get(`/api/total-sold`, null);
};