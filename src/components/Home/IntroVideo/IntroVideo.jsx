import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const IntroVideo = () => {
  const videoURL =
    "https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/Intro.mp4";

  const thumbnailUrl =
    "https://downloads.biamp.com/assets/images/default-source/installation-gallery/commercial-audio-retail-installations/sportland-sports-stores-sigulda-latvia-5.jpg?sfvrsn=d4daaa18_2";
  const videoRef = useRef(null); // Reference for the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to toggle play button visibility

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        EXPERIENCE OUR STORE
      </h2>
      <div className="relative">
        {/* Video Container with Poster */}
        <video
          ref={videoRef}
          src={videoURL}
          className="w-full border h-auto rounded-lg"
          poster={thumbnailUrl} // Your placeholder image URL
          onClick={togglePlayPause} // Toggle play/pause when video is tapped
        >
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all ease-in-out duration-200"
            >
              <FaPlay className="text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* Get Direction Button */}
      <div className="text-center mt-6">
        <button className="px-6 py-2 bg-gray-500 text-white font-bold text-lg rounded-full shadow-md hover:bg-gray-600 transition">
          <span className="flex items-center gap-2">
            Get Direction <IoLocationSharp />
          </span>
        </button>
      </div>
    </div>
  );
};

export default IntroVideo;
