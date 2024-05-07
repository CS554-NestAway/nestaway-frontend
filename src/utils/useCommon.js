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
    api.interceptors.request.use(
      (config) => {
        if (!isAbsoluteURLRegex.test(config.url)) {
          config.url = BaseURL + config.url;
        }
        console.log(currentUser?.accessToken);
        const AuthToken = currentUser?.accessToken;
        if (AuthToken === null || AuthToken === undefined || AuthToken === "") {
          config.headers.Authorization = "";
        } else {
          config.headers.Authorization = `Bearer ${AuthToken}`;
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
