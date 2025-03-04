
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function GoogleAnalyticForm({isShow}) {
  const [isEnableAnalytic, setIsEnableAnalytic] = useState(false);
  const [trackingID, setTrackingID] = useState("");
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/google-analytic");
      const data = response?.data?.data[0];

      setTargetId(data?._id);
      setIsEnableAnalytic(data?.isEnabled);
      setTrackingID(data?.trackingID);
      
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
      response = await axiosSecure.put(`/google-analytic/${targetId}`, 
        {
          isEnabled: isEnableAnalytic,
          trackingID
        });

        if(response.status === 200 || response.status === 201) {

          Swal.fire({
            title: "Success!",
            text: "Google analytic updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      
      } else {
        
        response = await axiosSecure.post(`/google-analytic`, {
          isEnabled: isEnableAnalytic,
          trackingID
          });

            if(response.status === 200 || response.status === 201) {

              Swal.fire({
                title: "Success!",
                text: "Google analytic created successfully",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          

          
      }

     
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    
  };
  

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-2xl text-gray-700 mb-6">Google Analytic</h3>
                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Allow Google Analytic
                    </label>
                    <select
                      className="customInput select"
                      value={isEnableAnalytic}
                      onChange={(e) => setIsEnableAnalytic(e.target.value === "true" ? true : false)}
                    >
                      <option value={false}>Disable Google Analytic</option>
                      <option value={true}>Enable Google Analytic</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Analytic Tracking ID
                    </label>
                    <input
                      type="text"
                      value={trackingID}
                      onChange={(e) => setTrackingID(e.target.value)}
                      className="customInput"
                      placeholder="G-XXXXXXXXX-X"
                    />
                  </div>


            <button
              type="submit"
              className="customSaveButton w-full"
              >
              Update
            </button>
            </form>
  );
}
