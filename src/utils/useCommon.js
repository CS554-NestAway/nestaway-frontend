import { useEffect } from "react";

const useCommon = () => {
  useEffect(() => {
    console.log("Hi");
  }, []);

  // useEffect(() => {
  //   const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
  //   api.interceptors.request.use((config) => {
  //     if (!isAbsoluteURLRegex.test(config.url)) {
  //       config.url = BaseURL + config.url;
  //     }
  //     const AuthToken = localStorage.getItem('AuthToken');
  //     if (AuthToken === null || AuthToken === undefined || AuthToken === '') {
  //       config.headers.Authorization = '';
  //     } else {
  //       config.headers.Authorization = `Bearer ${AuthToken}`;
  //     }
  //     return config;
  //   }, (error) => Promise.reject(error));

  //   // api.interceptors.response.use((response) => {
  //   //   console.log('response', response);
  //   // });
  //   api.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {

  //       // return Error object with Promise
  //       return Promise.reject(error);
  //     },
  //   );
  // }, [BaseURL]);
};

export default useCommon;
