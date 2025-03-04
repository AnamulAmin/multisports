import { useState, useEffect } from "react";

const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setSliders([]); // Initialize with empty array or replace with fetched data
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sliders List</h1>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
            Add New Slider
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Rearrange Slider
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  SL
                </th>
                <th scope="col" className="py-3 px-6">
                  Slider
                </th>
                <th scope="col" className="py-3 px-6">
                  Sub Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Slider Link
                </th>
                <th scope="col" className="py-3 px-6">
                  Button Text
                </th>
                <th scope="col" className="py-3 px-6">
                  Button Link
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sliders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No data available in table
                  </td>
                </tr>
              ) : (
                sliders.map((slider, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{slider.slider}</td>
                    <td className="py-3 px-6">{slider.subTitle}</td>
                    <td className="py-3 px-6">{slider.title}</td>
                    <td className="py-3 px-6">{slider.sliderLink}</td>
                    <td className="py-3 px-6">{slider.buttonText}</td>
                    <td className="py-3 px-6">{slider.buttonLink}</td>
                    <td className="py-3 px-6">{slider.status}</td>
                    <td className="py-3 px-6">
                      <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SliderList;
