import { useState } from "react";

export default function SendSMS() {
  const [sendingType, setSendingType] = useState("Everyone");
  const [customerContactNo, setCustomerContactNo] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [smsDescription, setSmsDescription] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxOrderValue, setMaxOrderValue] = useState("");
  const [message, setMessage] = useState("");

  // Example of templates (these can be fetched from an API)
  const smsTemplates = [
    { id: 1, title: "Welcome SMS", description: "Welcome to our platform!" },
    {
      id: 2,
      title: "Order Confirmation",
      description: "Your order has been confirmed.",
    },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the SMS sending process
    const smsData = {
      sendingType,
      customerContactNo,
      selectedTemplate,
      smsDescription,
      customerType,
      minOrder,
      maxOrder,
      minOrderValue,
      maxOrderValue,
    };

    setMessage("SMS Sent Successfully!");
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Send SMS</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Sending Type */}
            <div>
              <label className="block  ">Sending Type </label>
              <select
                value={sendingType}
                onChange={(e) => setSendingType(e.target.value)}
                className="customInput select"
                required
              >
                <option value="Everyone">Everyone</option>
                <option value="Specific Customer">Specific Customer</option>
              </select>
            </div>

            {/* Customer Contact No */}
            {sendingType === "Specific Customer" && (
              <div>
                <label className="block  ">Customer Contact No</label>
                <input
                  type="text"
                  value={customerContactNo}
                  onChange={(e) => setCustomerContactNo(e.target.value)}
                  className="customInput"
                  placeholder="Enter Customer Contact No"
                  required
                />
              </div>
            )}

            {/* Select SMS Template */}
            <div>
              <label className="block  ">Select SMS Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                  const selected = smsTemplates.find(
                    (t) => t.id === parseInt(e.target.value)
                  );
                  setSmsDescription(selected ? selected.description : "");
                }}
                className="customInput select"
              >
                <option value="">Select One</option>
                {smsTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SMS Template Description */}
            <div>
              <label className="block">SMS Template Description</label>
              <textarea
                value={smsDescription}
                onChange={(e) => setSmsDescription(e.target.value)}
                className="customInput resize-none"
                rows="3"
                placeholder="Write SMS Here"
                required
              />
            </div>

            {/* SMS Sending Criteria */}
            <div className="col-span-2 border-t pt-7 mt-3 border-gray-300">
              <h2 className=" text-2xl mb-6">
                SMS Sending Criteria (Optional)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Select Customer Type */}
                <div className="col-span-2">
                  <label className="block">Select Customer Type</label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="customInput select"
                  >
                    <option value="">Select One</option>
                    <option value="New">New Customer</option>
                    <option value="Returning">Returning Customer</option>
                  </select>
                </div>

                {/* Min. Order */}
                <div>
                  <label className="block ">Min. Order (Optional)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="customInput"
                    placeholder="e.g. 20"
                  />
                </div>

                {/* Max. Order */}
                <div>
                  <label className="block ">Max. Order (Optional)</label>
                  <input
                    type="number"
                    value={maxOrder}
                    onChange={(e) => setMaxOrder(e.target.value)}
                    className="customInput"
                    placeholder="e.g. 100"
                  />
                </div>

                {/* Minimum Order Value */}
                <div>
                  <label className="block">
                    Minimum Order Value (Optional)
                  </label>
                  <input
                    type="number"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    className="customInput"
                    placeholder="e.g. 1000"
                  />
                </div>

                {/* Maximum Order Value */}
                <div>
                  <label className="block ">
                    Maximum Order Value (Optional)
                  </label>
                  <input
                    type="number"
                    value={maxOrderValue}
                    onChange={(e) => setMaxOrderValue(e.target.value)}
                    className="customInput"
                    placeholder="e.g. 10000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Send SMS Button */}
          <div className="flex justify-end">
            <button type="submit" className="customSaveButton mt-6">
              Send SMS
            </button>
          </div>

          {/* Success/Info Message */}
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
