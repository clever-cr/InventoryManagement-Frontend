import HttpRequest from "../../utils/HttpRequest";

export const loginService = async (data) => {
  return HttpRequest.post(`/api/login`, data, {});
};

export const registerService = async (data) => {
  return HttpRequest.post(`/api/signup`, data, {});
};


