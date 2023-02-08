import axios from "axios";

// axios.defaults.baseURL = "https://orca-app-nn67b.ondigitalocean.app/api/v1/";

const $axios = axios.create({
  baseURL: "https://plankton-app-vomkh.ondigitalocean.app/api/v1/",
  withCredentials : true
});

export default $axios
