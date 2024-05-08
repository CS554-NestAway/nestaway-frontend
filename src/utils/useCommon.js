import { useEffect } from "react";
import api from "../api";
import { useSelector } from "react-redux";

const useCommon = () => {
  const BaseURL = import.meta.env.VITE_BASE_URL;
  // const { currentUser } = useContext(AuthContext);
  const currentUserRedux = useSelector((state) => state.auth.currentUser);
  // console.log(currentUser);

  useEffect(() => {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    let authToken = "";
    if (currentUserRedux) authToken = currentUserRedux?.accessToken;

    api.interceptors.request.use(
      (config) => {
        if (!isAbsoluteURLRegex.test(config.url)) {
          config.url = BaseURL + config.url;
        }

        if (!authToken) {
          config.headers.Authorization = "";
        } else {
          // console.log(authToken);
          config.headers.Authorization = `Bearer ${authToken}`;
          // console.log(config.headers);
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
  }, [BaseURL, currentUserRedux]);
};

export default useCommon;
