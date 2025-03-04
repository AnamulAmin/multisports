import Image from "next/image";
import about from "../../../Asset/about.png";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

function AboutHero() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <section className="  relative z-[1] pb-40 pt-8 bg-[#E9F1FA] dark:bg-transparent">
      <div className=" h-full absolute top-0 left-0 z-[-1] opacity-20"></div>
      <div className="w-[90%] container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between items-center">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm xl:max-w-2xl lg:text-left items-center sm:items-start dark:text-white">
          <h1 className="text-5xl font-semibold leading-tight">
            We combine{" "}
            <span className="text-[#00ABE4] dark:text-gray-400"> data </span>{" "}
            and technology for enterprise solutions
          </h1>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
