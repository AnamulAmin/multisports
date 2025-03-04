import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const SocialLoginForm = ({ isShow }) => {
  const [targetId, setTargetId] = useState("");

  const axiosSecure = useAxiosSecure();

  const [providers, setProviders] = useState({
    providers: [
      {
        name: "Google",
        enabled: false,
        clientId: "",
        clientSecret: "",
        redirectUrl: "https://yourwebsite.com/auth/callback",
        scope: "email profile",
        buttonText: "Login with Google",
      },
      {
        name: "Facebook",
        enabled: false,
        clientId: "",
        clientSecret: "",
        redirectUrl: "https://yourwebsite.com/auth/callback",
        scope: "email",
        buttonText: "Login with Facebook",
      },
    ],
  });
  const { register, control, handleSubmit, watch, setValue } = useForm({});

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/social-login-config");
      const data = response?.data?.data[0];

      // setProviders(data);

      if (data) {
        data.providers.map((item, index) => {
          setValue(`providers.${index}.name`, item.name);
          setValue(`providers.${index}.enabled`, item.enabled);
          setValue(`providers.${index}.clientId`, item.clientId);
          setValue(`providers.${index}.clientSecret`, item.clientSecret);
          setValue(`providers.${index}.redirectUrl`, item.redirectUrl);
          setValue(`providers.${index}.scope`, item.scope);
          setValue(`providers.${index}.buttonText`, item.buttonText);
        });

        setTargetId(data?._id);
      }
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const { fields } = useFieldArray({
    control,
    name: "providers",
  });

  const onSubmit = async (data) => {
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(
          `/social-login-config/${targetId}`,
          data
        );

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            le: "Success!",
            text: "Social Login updated successfully",
            icon: "success",
            firmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/social-login-config`, data);

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Social Login created successfully",
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {providers.providers.map((provider, index) => (
        <div key={provider.id} className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">
            {provider.name} Configuration
          </h2>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              {...register(`providers.${index}.enabled`)}
            />
            Enable {provider.name}
          </label>

          <div className="mt-4 space-y-3">
            <div>
              <label className="block font-medium">Client ID:</label>
              <input
                type="text"
                {...register(`providers.${index}.clientId`, { required: true })}
                className="w-full border p-2 rounded"
                placeholder="Enter Client ID"
              />
            </div>

            <div>
              <label className="block font-medium">Client Secret:</label>
              <input
                type="password"
                {...register(`providers.${index}.clientSecret`, {
                  required: true,
                })}
                className="w-full border p-2 rounded"
                placeholder="Enter Client Secret"
              />
            </div>

            <div>
              <label className="block font-medium">Redirect URL:</label>
              <input
                type="text"
                {...register(`providers.${index}.redirectUrl`)}
                className="w-full border p-2 rounded bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Scope:</label>
              <input
                type="text"
                {...register(`providers.${index}.scope`)}
                className="w-full border p-2 rounded"
                placeholder="e.g., email profile"
              />
            </div>

            <div>
              <label className="block font-medium">Button Text:</label>
              <input
                type="text"
                {...register(`providers.${index}.buttonText`)}
                className="w-full border p-2 rounded"
                placeholder={`Login with ${provider.name}`}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Configurations
      </button>
    </form>
  );
};

export default SocialLoginForm;
