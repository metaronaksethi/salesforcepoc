import axios, { AxiosRequestConfig } from "axios";


// const api = axios.create({ baseURL: process.env.REACT_APP_API_HOST });
const api = axios.create({ baseURL: process.env.REACT_APP_HOST });

let language = "en";
api.interceptors.request.use(
  async (config) => {
    if (config && config.headers) {
      const token = await sessionStorage.getItem("token");
      config.headers = {
        ...config.headers,
        "X-SHOP-Platform": "web",
        "X-SHOP-Version": "1.0.0",
        "Accept-Language": language || "en",
      };
      token && (config.headers["Authorization"] = `Bearer ${token}` || "");
      return config;
    }
  },
  (error) => {
    console.log({ error });
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // await localStorage.clear();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;