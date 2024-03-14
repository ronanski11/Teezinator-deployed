import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://teezinator.xyz/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from cookies
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith("TeezinatorToken=")
    );
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
