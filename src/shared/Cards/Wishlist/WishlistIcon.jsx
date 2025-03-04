import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
export default function WishlistIcon({
  item,
  setIsDeleted = () => { },
  setIsEdited = () => { },
}) {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(AuthContext);
  const [isLike, setIsLike] = useState(false);

  const axiosPublic = useAxiosPublic();

  const handleWishlist = async () => {
    setIsLike((prev) => {
      if (prev) {
        addToWishlist(item);
        setIsEdited((prev) => !prev);
        return false;
      } else {
        removeFromWishlist(item._id);
        setIsDeleted((prev) => !prev);
        return true;
      }
    });
  };

  useEffect(() => {
    setIsLike(!wishlist.map((item) => item._id).includes(item._id));
  }, [wishlist]);

  return (
    <div
      className=" bg-white text-xl cursor-pointer rounded-full p-1 shadow hover:shadow-lg absolute top-3 right-3 z-40"
      onClick={handleWishlist}
    >
      {isLike ? <AiOutlineHeart />
        : <AiFillHeart />}
    </div>
  );
}
