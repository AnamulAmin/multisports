import { IoIosSearch } from "react-icons/io";
import { useTypewriter } from "react-simple-typewriter";

export default function SearchArea({
  setIsFocused,
  setIsShowSearch,
  placeholders,
  isFocused,
}) {
  const [text] = useTypewriter({
    words: placeholders,
    loop: true,
    cursor: true,
    cursorStyle: "|",
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
    cursorBlinking: true,
  });

  const handleFocus = () => {
    // setIsFocused(true);
    setIsShowSearch(true);
  };

  const handleBlur = (e) => {
    if (e.target.value.length === 0) {
      setIsFocused(false);
    }
  };

  return (
    // <Typewriter
    //   words={placeholders}
    //   loop={5}
    //   cursor
    //   cursorStyle="_"
    //   typeSpeed={70}
    //   deleteSpeed={50}
    //   delaySpeed={1000}
    // />
    <div className="bg-gray-100 ml-auto md:ml-0 rounded-full md:px-3 w-[40px]  md:w-[70%] md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-center md:justify-between flex">
      <input
        type="text"
        className="outline-none w-0  md:w-full bg-gray-100  md:block"
        placeholder={!isFocused ? `Search for "${text}"` : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="search"
        name="search"
      />
      <label htmlFor="search" className="flex items-center justify-center">
        <IoIosSearch className="text-2xl text-gray-400" />
      </label>
    </div>
  );
}
