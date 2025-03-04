import { useEffect, useState } from "react";
import useAxiosCourier from "./useAxiosCourier";

function useCourierAccessToken() {
  const [accessToken, setAccessToken] = useState([]);

  const axiosCourier = useAxiosCourier();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const url = "/aladdin/api/v1/issue-token"; // Replace with actual base URL

      const requestData = {
        client_id: import.meta.env.VITE_COURIER_CLIENT_ID, // Replace with your client ID
        client_secret: import.meta.env.VITE_COURIER_CLIENT_SECRET, // Replace with your client secret
        username: import.meta.env.VITE_COURIER_EMAIL, // Replace with your client email
        password: import.meta.env.VITE_COURIER_PASSWORD, // Replace with your client password
        grant_type: "password",
      };

      requestData, "requestData";

      try {
        const res = await axiosCourier.post(url, requestData);

        if (res.status === 200 || res.status === 201) {
          setAccessToken(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching accessToken:", error);

        throw new Error("Failed to fetch accessToken");
      }
    };

    fetchAccessToken();
  }, [axiosCourier]);

  return accessToken;
}

export default useCourierAccessToken;
