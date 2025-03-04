import { useState } from "react";

export default function SendNotification() {
  const [serverKey, setServerKey] = useState("");
  const [fcmUrl, setFcmUrl] = useState("https://fcm.googleapis.com/fcm/send");
  const [topic, setTopic] = useState("/topics/example");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      to: topic,
      notification: {
        title: title,
        body: description,
      },
    };

    try {
      const response = await fetch(fcmUrl, {
        method: "POST",
        headers: {
          Authorization: `key=${serverKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Notification sent successfully!");
      } else {
        setMessage("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setMessage("Error occurred while sending notification.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">
          Send Push Notification to Mobile Devices
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Firebase Server Key */}
            <div>
              <label className="block font-bold mb-2">
                Firebase Server Key *
              </label>
              <input
                type="text"
                value={serverKey}
                onChange={(e) => setServerKey(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Firebase Server Key"
                required
              />
            </div>

            {/* FCM Notification URL */}
            <div>
              <label className="block font-bold mb-2">
                FCM Notification URL *
              </label>
              <input
                type="text"
                value={fcmUrl}
                onChange={(e) => setFcmUrl(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter FCM Notification URL"
                required
              />
            </div>

            {/* FCM Notification Topic */}
            <div>
              <label className="block font-bold mb-2">
                FCM Notification Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter FCM Notification Topic"
                required
              />
            </div>

            {/* Notification Title */}
            <div>
              <label className="block font-bold mb-2">
                Notification Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Notification Title"
                required
              />
            </div>

            {/* Notification Description */}
            <div>
              <label className="block font-bold mb-2">
                Notification Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Write Description Here"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white mt-5 py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Send Push Notification
          </button>

          {/* Display Message */}
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
