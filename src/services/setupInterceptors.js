import TokenService from "./token.service";
import axiosInstance from "./api";

const setup = (store) => {

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = token;  // for ASP.NET Core back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.defaults.withCredentials = true

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/User/authenticate" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            await axiosInstance.get("/User/refresh-token").then(
                (response) => {
                  const { jwtToken } = response.data;

                  store.dispatch('auth/refreshToken', jwtToken);
                  TokenService.updateLocalAccessToken(jwtToken);
                    console.log(response.data.jwtToken);
                },
                (error) => {
                  console.log("ERRRORR:" + error);
                }
            );

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
