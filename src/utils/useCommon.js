import { useContext, useEffect } from "react";
import api from "../api";
import { AuthContext } from "../contexts/AuthContext";

const useCommon = () => {
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  //   useEffect(() => {
  //     console.log("useCommon");
  //   }, []);

  useEffect(() => {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    const authToken = currentUser?.accessToken;

    api.interceptors.request.use(
      (config) => {
        if (!isAbsoluteURLRegex.test(config.url)) {
          config.url = BaseURL + config.url;
        }

        if (!authToken) {
          config.headers.Authorization = "";
        } else {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [BaseURL, currentUser]);
};

export default useCommon;
