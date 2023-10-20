import axios from "axios";

const httpService = axios.create();

httpService.interceptors.request.use((config) => {
  console.log("Imcomming request...");
  return config;
});

httpService.interceptors.response.use((config) => {
  console.log("Imcomming response...");
  return config;
});

export default httpService;
