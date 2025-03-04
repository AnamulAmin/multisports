import axios from "axios";
export const axiosCourier = axios.create({
  // baseURL: backendUrl ? backendUrl : "https://king-prawn-app-qkhg8.ondigitalocean.app/api",
  baseURL: import.meta.env.VITE_COURIER_URL,
  // timeout: 30000
});
const useAxiosCourier = () => {
  return axiosCourier;
};

export default useAxiosCourier;
