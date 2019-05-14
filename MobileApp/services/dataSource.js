import axios from "axios";
import { API_URL } from "react-native-dotenv";

/* eslint-disable */
/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: "http://192.168.0.18:5000"
});

axios.defaults.headers.common["Accept"] = "application/json";

/**
 * Request Wrapper with default success/error actions
 */
const DataSource = options => {
  const onSuccess = response => {
    console.debug("Request Successful!");
    return response.data;
  };

  const onError = error => {
    console.error("Request Failed:");
    if (error.request && error.request.status !== 0) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    if (error.request || (error.response && error.response.status !== 401)) {
      console.log(error.request, error.response);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default DataSource;
