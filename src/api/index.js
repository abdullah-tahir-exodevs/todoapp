import axios from "axios";
const backend = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.PRODURL
      : process.env.REACT_APP_LOCAL_URL,
});

export default backend;
