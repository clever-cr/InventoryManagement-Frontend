import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    if (status === 401) {
      try {
        setTimeout(() => {
          showNotifications();
        }, 4000);
        await new Promise((resolve) => setTimeout(resolve, 8000));
        localStorage.clear();
      } catch (navError) {
        console.error("Navigation to login failed:", navError);
      }
    } else if (status === 500) {
      setTimeout(() => {
        showNotifications();
      }, 5000);
    }

    return Promise.reject(error);
  }
);


class HttpRequest {
  // static patch(arg0: string, token: string) {
  //   throw new Error("Method not implemented.");
  // }
  static async get(url, token) {
    try {
      const res = await axiosInstance({
        method: "GET",
        url,
        headers: {
          authToken: `${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }

  static async post(url, data, token) {
    try {
      const res = await axiosInstance({
        method: "POST",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // static async delete(url: string, token: string, data?: any) {
  //   try {
  //     const res = await axiosInstance({
  //       method: "DELETE",
  //       url,
  //       headers: {
  //         authToken: `${token}`,
  //       },
  //       data,
  //     });

  //     return res.data;
  //   } catch (err: any) {
  //     console.log(err.response);
  //     return err;
  //   }
  // }

  // static async update(url: string, data: any, token: string) {
  //   try {
  //     const res = await axiosInstance({
  //       method: "PATCH",
  //       url,
  //       headers: {
  //         authToken: `${token}`,
  //       },
  //       data,
  //     });

  //     return res.data;
  //   } catch (err: any) {
  //     return err;
  //   }
  // }

}

export default HttpRequest;
